import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileModel } from 'src/app/interfaces/user.interface';
import { SidebarService, LocalStorageService, AppService } from 'src/app/services/services.index';
import { Router } from '@angular/router';
import { SupplierService } from '../../../../services/purchase/supplier.service';
import { DocumentTypesService } from '../../../../services/settings/document-types.service';
import { SupplierTypeService } from '../../../../services/settings/supplier-type.service';
import { MoneyTypeService } from '../../../../services/settings/money-type.service';

declare var $:any;
declare var swal: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class SupplierCreateComponent implements OnInit {
  forma:FormGroup;
  userProfile: UserProfileModel;
  documentsList: any [] = [];
  supplierList: any [] = [];
  countryList: any [] = [];
  departmentList: any [] = [];
  citiesList: any [] = [];
  moneyList: any [] = [];
  constructor(private _moneyService: MoneyTypeService ,private _supplierTypeService: SupplierTypeService ,private _documentService: DocumentTypesService, private _sidebarService: SidebarService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _supplierService: SupplierService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.loadAllDocuments();
    this.loadAllSupplierTypes();
    this.loadAllCountries();
    this.loadAllMoneyTypes();
    this.formInit();
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

  loadAllDocuments(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.documentsList = [];
    this._documentService.getAllDocuments().subscribe((result)=>{
      $('body').loading('stop');
      this.documentsList = result.json().data;
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

  loadAllSupplierTypes(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.supplierList = [];
    this._supplierTypeService.getAllSupplierTypes().subscribe((result)=>{
      $('body').loading('stop');
      this.supplierList = result.json().data;
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

  loadAllCountries(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.countryList = [];
    this._supplierService.getAllCountries().subscribe((result)=>{
      $('body').loading('stop');
      this.countryList = result.json().data;
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

  loadAllDepartments(id: number){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.departmentList = [];
    this._supplierService.getAllDepartments(id).subscribe((result)=>{
      $('body').loading('stop');
      this.departmentList = result.json().data;
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

  loadAllCities(id: number){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.citiesList = [];
    this._supplierService.getAllCities(id).subscribe((result)=>{
      $('body').loading('stop');
      this.citiesList = result.json().data;
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

  getDepartments() {
    this.loadAllDepartments(this.forma.value.CountryId);
  }

  getCities() {
    this.loadAllCities(this.forma.value.DepartmentId);
  }

  formInit() {
    this.forma = new FormGroup({
      'SupplierId': new FormControl(0),
      'Name': new FormControl('', Validators.required),
      'DocumentTypeId': new FormControl('', Validators.required),
      'Document': new FormControl('', Validators.required),
      'Regime': new FormControl(''),
      'CompanyType': new FormControl(''),
      'SupplierTypeId': new FormControl('', Validators.required),
      'Address': new FormControl(''),
      'CountryId': new FormControl(''),
      'DepartmentId': new FormControl(''),
      'CityId': new FormControl(''),
      'Phone1': new FormControl('', Validators.required),
      'Phone2': new FormControl(''),
      'Fax': new FormControl(''),
      'TypeOfActivity': new FormControl(''),
      'CiiuCode': new FormControl(''),
      'EconActDescription': new FormControl(''),
      'LegalPersonName': new FormControl(''),
      'LegalPersonFec': new FormControl(''),
      'LegalPersonDocTypeId': new FormControl(''),
      'LegalPersonDocument': new FormControl(''),
      'LegalPersonPhone': new FormControl(''),
      'LegalPersonCellPhone': new FormControl(''),
      'LegalPersonEmail': new FormControl(''),
      'MoneyTypeId': new FormControl(''),
      'Observations': new FormControl(''),
      'LogoUrl': new FormControl('')
    });
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'Guardando datos. Por favor espere.'
    });
    this._supplierService.saveSuplier(this.forma.value)
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
    this._router.navigate(['/suppliers','list']);
  }
}
