import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from 'src/app/interfaces/user.interface';
import { SidebarService, LocalStorageService } from 'src/app/services/services.index';
import { Router } from '@angular/router';
import { MoneyTypeService } from '../../../../services/settings/money-type.service';
declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MoneyTypeListComponent implements OnInit {
  table: any;
  moneyList: any [] = [];
  userProfile: UserProfileModel;
  constructor(private _sidebarService: SidebarService, private _router: Router, private _moneyService: MoneyTypeService, private _localStorage: LocalStorageService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.loadAllMoneyTypes();
  }

  ngOnInit() {
  }

  loadAllMoneyTypes(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.moneyList = [];
    this._moneyService.getAllMoneyTypes().subscribe((result)=>{
      $('body').loading('stop');
      this.moneyList = result.json().data;
      if(this.moneyList){
        if(this.moneyList.length > 0){
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

  goToUpdateMoneyType(data: any){
    this._router.navigate(['/money-types','update',data.moneyTypeId]);
  }

  deleteMoneyType(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste Registro?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._moneyService.deleteMoneyType(data.moneyTypeId).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadAllMoneyTypes();
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
