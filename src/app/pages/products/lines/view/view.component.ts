import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { LineService } from '../../../../services/products/line.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../../services/shared/local-storage.service';
import { AppService } from '../../../../services/services.index';
import { SpecialityService } from '../../../../services/products/speciality.service';
import { SystemService } from '../../../../services/products/system.service';
import { ProcedureService } from '../../../../services/products/procedure.service';

declare var $:any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class LinesViewComponent implements OnInit {
  table1: any;
  table2: any;
  userProfile: UserProfileModel;
  lineId: number = 0;
  line: any;
  constructor(private _procedureService:ProcedureService, private _systemService: SystemService, private _lineService: LineService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _specialityService: SpecialityService, private _activatedRoute: ActivatedRoute) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this._activatedRoute.params.subscribe((params)=>{
      this.lineId = params['id'];
      this.loadLine(this.lineId);
    });
  }

  ngOnInit() {
  }

  loadLine(id: number) {
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this._lineService.getLine(id).subscribe((result)=>{
      $('body').loading('stop');
      if(result.json()){
        if(result.json().data){
          this.line = result.json().data;
          setTimeout(() => {
            if(this.table1 != undefined){
              this.table1.destroy();
              this.table1 = undefined;
            }
            if(this.table2 != undefined){
              this.table2.destroy();
              this.table2 = undefined;
            }


            if(this.line.systems.length > 0){
              if(this.table1 == undefined){
                setTimeout(() => {
                  this.table1 = $('#systemTable').DataTable({
                    "language": {
                      "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                  }
                  });
                }, 500);
              }
            }

            if(this.line.procedures.length > 0){
              if(this.table2 == undefined){
                setTimeout(() => {
                  this.table2 = $('#procedureTable').DataTable({
                    "language": {
                      "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                  }
                  });
                }, 500);
              }
            }
          }, 1000);
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
    this._router.navigate(['/lines']);
  }

  goToUpdateSystem(data: any){
    this._router.navigate(['/systems','update',data.id]);
  }

  deleteSystem(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste Registro?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._systemService.deleteSystem(data.id).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadLine(this.lineId);
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

  goToUpdateProcedure(data: any){
    this._router.navigate(['/procedures','update',data.id]);
  }

  deleteProcedure(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste Registro?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._procedureService.deleteProcedure(data.id).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadLine(this.lineId);
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
