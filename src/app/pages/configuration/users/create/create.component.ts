import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileModel } from '../../../../interfaces/user.interface';
import { DepartmentModel } from '../../../../interfaces/department.Interface';
import { GenreModel } from '../../../../interfaces/genre.interface';
import swal from 'sweetalert';
import { SidebarService } from '../../../../services/shared/sidebar.service';
import { LocalStorageService } from '../../../../services/shared/local-storage.service';
import { AppService } from '../../../../services/admin/app.service';
import { UserService } from '../../../../services/admin/user.service';
import { DocumentTypesService } from '../../../../services/settings/document-types.service';
import { RoleService } from '../../../../services/settings/role.service';

declare var $:any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: []
})
export class UsersCreateComponent implements OnInit {
  forma:FormGroup;
  userProfile: UserProfileModel;
  departmentList: DepartmentModel [] = [];
  documentsList: any [] = [];
  rolesList: any [] = [];
  cityList: any [] = [
    {
      "Id": 54003,
      "Name": "Ábrego"
    },
    {
      "Id": 54418,
      "Name": "Lourdes"
    },
    {
      "Id": 54480,
      "Name": "Mutiscua"
    },
    {
      "Id": 54498,
      "Name": "Ocaña"
    },
    {
      "Id": 54518,
      "Name": "Pamplona"
    },
    {
      "Id": 54520,
      "Name": "Pamplonita"
    },
    {
      "Id": 54553,
      "Name": "Puerto Santander"
    },
    {
      "Id": 54599,
      "Name": "Ragonvalia"
    },
    {
      "Id": 54405,
      "Name": "Los Patios"
    },
    {
      "Id": 54660,
      "Name": "Salazar"
    },
    {
      "Id": 54673,
      "Name": "San Cayetano"
    },
    {
      "Id": 54680,
      "Name": "Santiago"
    },
    {
      "Id": 54720,
      "Name": "Sardinata"
    },
    {
      "Id": 54743,
      "Name": "Silos"
    },
    {
      "Id": 54800,
      "Name": "Teorama"
    },
    {
      "Id": 54810,
      "Name": "Tibú"
    },
    {
      "Id": 54820,
      "Name": "Toledo"
    },
    {
      "Id": 54670,
      "Name": "San Calixto"
    },
    {
      "Id": 54377,
      "Name": "Labateca"
    },
    {
      "Id": 54398,
      "Name": "La Playa"
    },
    {
      "Id": 54385,
      "Name": "La Esperanza"
    },
    {
      "Id": 54051,
      "Name": "Arboledas"
    },
    {
      "Id": 54099,
      "Name": "Bochalema"
    },
    {
      "Id": 54109,
      "Name": "Bucarasica"
    },
    {
      "Id": 54128,
      "Name": "Cáchira"
    },
    {
      "Id": 54125,
      "Name": "Cácota"
    },
    {
      "Id": 54172,
      "Name": "Chinácota"
    },
    {
      "Id": 54174,
      "Name": "Chitagá"
    },
    {
      "Id": 54206,
      "Name": "Convención"
    },
    {
      "Id": 54001,
      "Name": "Cúcuta"
    },
    {
      "Id": 54223,
      "Name": "Cucutilla"
    },
    {
      "Id": 54239,
      "Name": "Durania"
    },
    {
      "Id": 54245,
      "Name": "El Carmen"
    },
    {
      "Id": 54250,
      "Name": "El Tarra"
    },
    {
      "Id": 54261,
      "Name": "El Zulia"
    },
    {
      "Id": 54313,
      "Name": "Gramalote"
    },
    {
      "Id": 54344,
      "Name": "Hacarí"
    },
    {
      "Id": 54347,
      "Name": "Herrán"
    },
    {
      "Id": 54871,
      "Name": "Villa Caro"
    },
    {
      "Id": 54874,
      "Name": "Villa del Rosario"
    }
  ];
  genreList: GenreModel [] = [
    {
      Id: 1,
      Name: "Masculino"
    },
    {
      Id: 2,
      Name: "Femenino"
    },
    {
      Id: 3,
      Name: "Sin Especificar"
    }
  ];
  constructor(private _sidebarService: SidebarService, private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _userService: UserService, private _documentService: DocumentTypesService, private _roleService: RoleService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.formInit();
    this.loadDocumentTypes();
    this.loadPersonTypes();
  }

  loadDocumentTypes(){
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

  loadPersonTypes(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this.rolesList = [];
    this._roleService.getAllRoles().subscribe((result)=>{
      $('body').loading('stop');
      this.rolesList = result.json().data;
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


  ngOnInit() {
    
  }

  loadCities(id: number){
    this.cityList = [];
    this._appService.getCitiesByDep(id).subscribe((result)=>{
      this.cityList = result.json().data;
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
  }

  formInit() {
    this.forma = new FormGroup({
      'UserId': new FormControl(0, Validators.required),
      'FirstName': new FormControl('', Validators.required),
      'LastName': new FormControl('', Validators.required),
      'DocumentTypeId': new FormControl(0, Validators.required),
      'Document': new FormControl('', Validators.required),
      'Address': new FormControl(''),
      'CityId': new FormControl(null, Validators.required),
      'DateOfBirth': new FormControl(new Date()),
      'GenreId': new FormControl(null, Validators.required),
      'Phone': new FormControl('', Validators.required),
      'CellPhone': new FormControl(''),
      'Salario': new FormControl(0),
      'Email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'PersonTypeId': new FormControl(0, Validators.required),
      'Password': new FormControl('', Validators.required),
    })
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'Guardando datos. Por favor espere.'
    });
    this._userService.saveUser(this.forma.value)
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
    this._router.navigate(['/users','list']);
  }

}
