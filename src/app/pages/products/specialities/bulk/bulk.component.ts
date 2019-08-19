import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialityService } from '../../../../services/products/speciality.service';
import { ConfigService } from '../../../../services/settings/config.service';

declare var $: any;
@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.css']
})
export class SpecialitiesBulkComponent implements OnInit {
  excelLoaded: boolean = false;
  excelFile: any;
  baseUrl: string = "";
  fileUrl: string = "";
  constructor(private _router: Router, private _uploadService: SpecialityService, private _configService: ConfigService) { 
    this.baseUrl = this._configService.getBackURI();
    this.fileUrl = this.baseUrl + "assets/files/cargue_masivo_especialidades.xlsx";
  }

  ngOnInit() {
  }

  loadExcel(event){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea subir este archivo?",
      buttons: ["Cancelar", "Subir"],
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.readURL(event.target);
      }
    });
  }

  readURL(input) {
    let reader = new FileReader();
    if (input.files && input.files[0]) {
      this.excelFile = input.files[0];
      reader.readAsDataURL(this.excelFile);
      reader.onload = (e:any) => {
        this.excelLoaded = true;
        this.uploadFileNew();
      };
    }
  }

  uploadFileNew(){
    $('body').loading({
      theme: 'light',
      message: 'Cargando datos. Por favor espere.'
    });
    this._uploadService.uploadExcelFile(this.excelFile).subscribe((resp)=>{
      $('body').loading('stop');
      if(resp.json()){
        if(resp.json().success == false){
          swal('Señor Usuario', resp.json().message, 'warning');
        }else{
          //Recibo respuesta de Voluntarios
          swal('Señor Usuario', resp.json().message, 'success');
        }
      }
    },
    error => {
      $('body').loading('stop');
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
