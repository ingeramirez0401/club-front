import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { Router } from '@angular/router';
import { SidebarService } from '../../../../services/shared/sidebar.service';
import { ReasonRejectService } from '../../../../services/settings/reason-reject.service';
import { LocalStorageService } from '../../../../services/shared/local-storage.service';

declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RejectReasonListComponent implements OnInit {
  table: any;
  reasonsList: any [] = [];
  userProfile: UserProfileModel;
  constructor(private _sidebarService: SidebarService, private _router: Router, private _reasonService: ReasonRejectService, private _localStorage: LocalStorageService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.loadAllReasons();
  }

  ngOnInit() {
  }

  loadAllReasons(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.reasonsList = [];
    this._reasonService.getAllReasons().subscribe((result)=>{
      $('body').loading('stop');
      this.reasonsList = result.json().data;
      if(this.reasonsList){
        if(this.reasonsList.length > 0){
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

  goToUpdateReason(data: any){
    this._router.navigate(['/reject-reasons','update',data.id]);
  }

  deleteReason(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste Registro?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._reasonService.deleteReason(data.id).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadAllReasons();
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
