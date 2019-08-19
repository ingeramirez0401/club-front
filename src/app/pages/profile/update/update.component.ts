import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileModel } from '../../../interfaces/user.interface';
import { DepartmentModel } from '../../../interfaces/department.Interface';
import { CityModel } from '../../../interfaces/city.interface';
import { GenreModel } from '../../../interfaces/genre.interface';
import swal from 'sweetalert';
import { LocalStorageService } from '../../../services/shared/local-storage.service';
import { AppService } from '../../../services/admin/app.service';
import { UserService } from '../../../services/admin/user.service';
import { UploadFileService } from '../../../services/shared/upload-file.service';
import { SidebarService } from '../../../services/shared/sidebar.service';

declare var $:any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: []
})
export class ProfileUpdateComponent implements OnInit {
  forma:FormGroup;
  UserId: number = 0;
  userProfile: UserProfileModel;

  file: File;
  imageLoaded: boolean = false;
  //Listados
  departmentList: DepartmentModel [] = [];
  cityList: CityModel [] = [];
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
  
  constructor( private _router: Router, private _localStorage: LocalStorageService, private _appService: AppService, private _activatedRoute: ActivatedRoute, private _userService: UserService, private _uploadService: UploadFileService, private _sidebarService: SidebarService ) { 
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.formInit();
    this._activatedRoute.params.subscribe((params)=>{
      this.UserId = params['id'];
    });
    this.loadCities(this.userProfile.departmentId);
  }

  ngOnInit() {
    

    let data = {
      UserId: this.userProfile.userId,
      FirstName: this.userProfile.firstName,
      LastName: this.userProfile.lastName,
      CityId: this.userProfile.cityId,
      GenreId: this.userProfile.genreId,
      Address: this.userProfile.address,
      Phone: this.userProfile.phone,
      RoleUser: this.userProfile.role,
      UserName: this.userProfile.userEmail,
      Password: ''
    };
    this.forma.setValue(data);

    this.loadCities(this.userProfile.departmentId);
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
      'CityId': new FormControl(null, Validators.required),
      'GenreId': new FormControl(null, Validators.required),
      'Address': new FormControl('', Validators.required),
      'Phone': new FormControl('', Validators.required),
      'RoleUser': new FormControl('Usuario', Validators.required),
      'UserName': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'Password': new FormControl('', Validators.required)
    })
  }

  saveChanges() {
    this._userService.saveProfile(this.forma.value)
    .subscribe(result => {
      if(result.json().success == true){
        this._userService.updateLocalData(result.json().data);
        this.goToProfile();
      }else{
        swal('Señor Usuario', result.json().message, 'warning');
      }
    },
    error => {
      swal('Señor Usuario', 'Se ha presentado un error en el sistema. Por favor comuniquese con el administrador', 'error');
    });
  }

  goToProfile() {
    this.imageLoaded = false;
    this._router.navigate(['/profile','view']);
  }

  loadPhoto(event){
    this.readURL(event.target);
  }

  readURL(input) {
    let reader = new FileReader();
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = (e:any) => {
        $('#picturePreview').attr('src', e.target.result).fadeIn('slow');
        this.imageLoaded = true;
      };
    }
  }

  uploadFile(){
    this._uploadService.uploadFile(this.file, 'users', this.userProfile.userId).subscribe((resp)=>{
      if(resp.json()){
        if(resp.json().success == false){
          swal('Señor Usuario', resp.json().message, 'warning');
        }else{
          this._userService.updateLocalData(resp.json().data);
          swal('Señor Usuario', resp.json().message, 'success');
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

}

//Interfaces
interface FileReaderEventTarget extends EventTarget {
  result:string
  }
  
  interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
  }