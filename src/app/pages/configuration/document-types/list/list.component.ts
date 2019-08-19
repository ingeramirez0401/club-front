import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { Router } from '@angular/router';
import { SidebarService } from '../../../../services/shared/sidebar.service';
import { DocumentTypesService } from '../../../../services/settings/document-types.service';
import { LocalStorageService } from '../../../../services/shared/local-storage.service';

declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class DocumentTypesListComponent implements OnInit {
  table: any;
  documentsList: any [] = [];
  userProfile: UserProfileModel;
  constructor(private _sidebarService: SidebarService, private _router: Router, private _documentService: DocumentTypesService, private _localStorage: LocalStorageService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.loadAllDocuments();
  }

  ngOnInit() {
  }

  loadAllDocuments(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.documentsList = [];
    this._documentService.getAllDocuments().subscribe((result)=>{
      $('body').loading('stop');
      this.documentsList = result.json().data;
      if(this.documentsList){
        if(this.documentsList.length > 0){
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

  goToUpdateDocument(data: any){
    this._router.navigate(['/document-types','update',data.id]);
  }

  deleteDocument(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste Registro?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._documentService.deleteDocument(data.id).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadAllDocuments();
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
