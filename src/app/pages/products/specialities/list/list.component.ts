import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { SidebarService } from '../../../../services/shared/sidebar.service';
import { Router } from '@angular/router';
import { SpecialityService } from '../../../../services/products/speciality.service';
import { LocalStorageService } from '../../../../services/shared/local-storage.service';

declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class SpecialitiesListComponent implements OnInit {
  table: any;
  specialtiesList: any [] = [];
  userProfile: UserProfileModel;
  constructor(private _sidebarService: SidebarService, private _router: Router, private _specialityService: SpecialityService, private _localStorage: LocalStorageService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.loadAllSpecialties();
  }

  ngOnInit() {
  }

  loadAllSpecialties(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.specialtiesList = [];
    this._specialityService.getAllSpecialities().subscribe((result)=>{
      $('body').loading('stop');
      this.specialtiesList = result.json().data;
      if(this.specialtiesList){
        if(this.specialtiesList.length > 0){
          if(this.table == undefined){
            setTimeout(() => {
              this.table = $('#myTable').DataTable({
                "language": {
                  "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
              }
              });
            }, 500);
          }
        }
      }
    },
    error => {
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar ésta acción.', 'warning');
        this._router.navigate(['/login']);
      }
      if(error.json() || error.json().type == "error"){
        let errorMessage = "Ocurrió un error al ejecutar ésta acción. Por favor verifique";
        if(error.json().message != undefined){
          errorMessage = error.json().message;
        }
        swal('Señor Usuario', errorMessage, 'error');
      }
    });
  }

  goToViewSpecialty(data: any){
    this._router.navigate(['/specialties','view',data.id]);
  }

  goToUpdateSpeciality(data: any){
    this._router.navigate(['/specialties','update',data.id]);
  }

  deleteSpeciality(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste Registro?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._specialityService.deleteSpeciality(data.id).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadAllSpecialties();
            }
          }
        },
        error => {
          if(error.status == 401){
            swal('Señor Usuario', 'No tiene permisos para ejecutar ésta acción.', 'error');
            this._router.navigate(['login']);
          }
          if(error.json() || error.json().type == "error"){
            let errorMessage = "Ocurrió un error al ejecutar ésta acción. Por favor verifique";
            if(error.json().message != undefined){
              errorMessage = error.json().message;
            }
            swal('Señor Usuario', errorMessage, 'error');
          }
        });
      }
    });
  }

}
