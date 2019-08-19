import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { SidebarService, LocalStorageService, AppService } from '../../../../services/services.index';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialityService } from '../../../../services/products/speciality.service';
import { LineService } from '../../../../services/products/line.service';

declare var $:any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class SpecialitiesViewComponent implements OnInit {
  userProfile: UserProfileModel;
  specialityId: number = 0;
  speciality: any;
  constructor(private _lineService: LineService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _specialityService: SpecialityService, private _activatedRoute: ActivatedRoute) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this._activatedRoute.params.subscribe((params)=>{
      this.specialityId = params['id'];
      this.loadSpeciality(this.specialityId);
    });
  }

  ngOnInit() {
  }

  loadSpeciality(id: number) {
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this._specialityService.getSpeciality(id).subscribe((result)=>{
      $('body').loading('stop');
      if(result.json()){
        if(result.json().data){
          this.speciality = result.json().data;
          console.log(this.speciality);
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

  goToList() {
    this._router.navigate(['/specialties']);
  }

  goToUpdateLine(data: any){
    this._router.navigate(['/lines','update',data.id]);
  }

  deleteLine(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste Registro?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._lineService.deleteLine(data.id).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadSpeciality(this.specialityId);
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
