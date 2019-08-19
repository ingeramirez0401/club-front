import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { SidebarService, LocalStorageService, AppService } from '../../../../services/services.index';
import { Router } from '@angular/router';
import { SystemService } from '../../../../services/products/system.service';
import { SpecialityService } from '../../../../services/products/speciality.service';

declare var $:any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class SystemsCreateComponent implements OnInit {
  forma:FormGroup;
  userProfile: UserProfileModel;
  specialityList: any [] = [];
  lineList: any [] = [];
  constructor(private _sidebarService: SidebarService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _systemService: SystemService, private _specialityService: SpecialityService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.formInit();
    this.LoadAllSpecialties();
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

  setSpeciality() {
    this.lineList = [];
    if(this.forma.value.SpecialityId > 0){
      this.specialityList.forEach((item)=>{
        if(item.id == this.forma.value.SpecialityId){
          this.lineList = item.lines;
        }
      });
    }
  }

  formInit() {
    this.forma = new FormGroup({
      'SystemId': new FormControl(0, Validators.required),
      'SpecialityId': new FormControl(0, Validators.required),
      'LineId': new FormControl(0, Validators.required),
      'Name': new FormControl('', Validators.required)
    })
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'Guardando datos. Por favor espere.'
    });
    this._systemService.saveSystem(this.forma.value)
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
    this._router.navigate(['/systems','list']);
  }

}


