import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { SidebarService } from '../../../../services/shared/sidebar.service';
import { UserService } from '../../../../services/admin/user.service';
import { LocalStorageService } from '../../../../services/shared/local-storage.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit {
  table: any;
  userList: any [] = [];
  userProfile: UserProfileModel;
  constructor(private _sidebarService: SidebarService, private _router: Router, private _userService: UserService, private _localStorage: LocalStorageService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.loadAllUsers();
  }

  ngOnInit() {
    
  }

  loadAllUsers(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.userList = [];
    this._userService.getAllUsers().subscribe((result)=>{
      $('body').loading('stop');
      this.userList = result.json().data;
      this.userList.forEach((item, index)=>{
        if(item.id == this.userProfile.userId){
          this.userList.splice(index, 1);
        }
      });
      if(this.userList){
        if(this.userList.length > 0){
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

  goToUpdateUser(data: any){
    this._router.navigate(['/users','update',data.userId]);
  }

  deleteUser(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste Usuario?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._userService.deleteUser(data.id).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadAllUsers();
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
