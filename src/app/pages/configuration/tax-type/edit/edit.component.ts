import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileModel } from 'src/app/interfaces/user.interface';
import { SidebarService, LocalStorageService, AppService } from 'src/app/services/services.index';
import { Router, ActivatedRoute } from '@angular/router';
import { TaxTypeService } from '../../../../services/settings/tax-type.service';

declare var $:any;
declare var swal: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class TaxTypeEditComponent implements OnInit {
  forma:FormGroup;
  userProfile: UserProfileModel;
  taxId: number = 0;
  constructor(private _sidebarService: SidebarService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _taxService: TaxTypeService, private _activatedRoute: ActivatedRoute) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.formInit();

    this._activatedRoute.params.subscribe((params)=>{
      this.taxId = params['id'];
      this._taxService.getTax(this.taxId).subscribe((result)=>{
        let data = result.json().data;
        let roleEdit = {
          TaxTypeId: data.taxTypeId,
          Name: data.name,
          Value: data.value
        }

        this.forma.setValue(roleEdit);
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
      'TaxTypeId': new FormControl(0, Validators.required),
      'Name': new FormControl('', Validators.required),
      'Value': new FormControl('', Validators.required)
    })
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'Guardando datos. Por favor espere.'
    });
    this._taxService.updateTax(this.forma.value)
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
    this._router.navigate(['/tax-types','list']);
  }

}
