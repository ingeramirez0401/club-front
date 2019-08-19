import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { SidebarService } from '../../../../services/shared/sidebar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../../services/shared/local-storage.service';
import { AppService } from '../../../../services/admin/app.service';
import { LineService } from '../../../../services/products/line.service';
import { SpecialityService } from '../../../../services/products/speciality.service';

declare var $:any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class LinesEditComponent implements OnInit {
  forma:FormGroup;
  userProfile: UserProfileModel;
  lineId: number = 0;
  specialityList: any [] = [];
  constructor(private _sidebarService: SidebarService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _lineService: LineService, private _activatedRoute: ActivatedRoute, private _specialityService: SpecialityService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.formInit();
    this.LoadAllSpecialties();

    this._activatedRoute.params.subscribe((params)=>{
      this.lineId = params['id'];
      this._lineService.getLine(this.lineId).subscribe((result)=>{
        let data = result.json().data;
        let lineEdit = {
          LineId: data.id,
          SpecialityId: data.specialityId,
          Name: data.name
        }

        this.forma.setValue(lineEdit);
      },
      error => {
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
    });
  }

  ngOnInit() {
    
  }

  LoadAllSpecialties(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.specialityList = [];
    this._specialityService.getAllSpecialities().subscribe((result)=>{
      $('body').loading('stop');
      this.specialityList = result.json().data;
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

  formInit() {
    this.forma = new FormGroup({
      'LineId': new FormControl(0, Validators.required),
      'SpecialityId': new FormControl(0, Validators.required),
      'Name': new FormControl('', Validators.required)
    })
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'Guardando datos. Por favor espere.'
    });
    this._lineService.updateLine(this.forma.value)
    .subscribe(result => {
      $('body').loading('stop');
      if(result.json().success == true){
        this.goToList();
      }else{
        swal('Señor Usuario', result.json().message, 'warning');
      }
    },
    error => {
      $('body').loading('stop');
      swal('Señor Usuario', 'Se ha presentado un error en el sistema. Por favor comuniquese con el administrador', 'error');
    });
  }

  goToList() {
    this._router.navigate(['/lines','list']);
  }

}
