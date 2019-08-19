import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { SidebarService } from '../../../../services/shared/sidebar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../../services/shared/local-storage.service';
import { AppService } from '../../../../services/admin/app.service';
import { SpecialityService } from '../../../../services/products/speciality.service';

declare var $:any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class SpecialitiesEditComponent implements OnInit {
  forma:FormGroup;
  userProfile: UserProfileModel;
  specialityId: number = 0;
  constructor(private _sidebarService: SidebarService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _specialityService: SpecialityService, private _activatedRoute: ActivatedRoute) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.formInit();

    this._activatedRoute.params.subscribe((params)=>{
      this.specialityId = params['id'];
      this._specialityService.getSpeciality(this.specialityId).subscribe((result)=>{
        let data = result.json().data;
        let specialityEdit = {
          SpecialityId: data.id,
          Name: data.name
        }

        this.forma.setValue(specialityEdit);
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

  formInit() {
    this.forma = new FormGroup({
      'SpecialityId': new FormControl(0, Validators.required),
      'Name': new FormControl('', Validators.required)
    })
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'Guardando datos. Por favor espere.'
    });
    this._specialityService.updateSpeciality(this.forma.value)
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
    this._router.navigate(['/specialties','list']);
  }

}
