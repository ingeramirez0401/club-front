import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileModel } from 'src/app/interfaces/user.interface';
import { SidebarService, LocalStorageService, AppService } from 'src/app/services/services.index';
import { Router } from '@angular/router';
import { MoneyTypeService } from '../../../../services/settings/money-type.service';

declare var $:any;
declare var swal: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class MoneyTypeCreateComponent implements OnInit {
  forma:FormGroup;
  userProfile: UserProfileModel;
  constructor(private _sidebarService: SidebarService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _moneyService: MoneyTypeService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.formInit();
  }

  ngOnInit() {
    
  }

  formInit() {
    this.forma = new FormGroup({
      'MoneyTypeId': new FormControl(0),
      'Name': new FormControl('', Validators.required),
      'Value': new FormControl('', Validators.required)
    });
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'Guardando datos. Por favor espere.'
    });
    this._moneyService.saveMoneyType(this.forma.value)
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
    this._router.navigate(['/money-types','list']);
  }

}
