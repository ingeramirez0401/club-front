import { Injectable } from '@angular/core';
import { UserProfileModel } from '../../interfaces/user.interface';
import { ConfigService } from '../settings/config.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;
  constructor(private _configService: ConfigService, private _localStorage: LocalStorageService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllTipoGastos() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/tipogastos', { headers });
  }

  getTipoGasto(id: number) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/tipogastos/' + id, { headers });
  }

  saveGasto(newData: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let TipoGastoId = newData.TipoGastoId;
    let Nombre = newData.Nombre;
    
    let body = JSON.stringify({ TipoGastoId, Nombre });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/tipogastos", body, options);
  }

  updateGasto(newData: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let TipoGastoId = newData.TipoGastoId;
    let Nombre = newData.Nombre;
    
    let body = JSON.stringify({ TipoGastoId, Nombre });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/tipogastos/" + TipoGastoId, body, options);
  }

  deleteData(gastoId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/tipogastos/'+ gastoId, { headers });
  }

  getAllVehiculos() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/vehiculos', { headers });
  }

  getVehiculo(id: number) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/vehiculos/' + id, { headers });
  }

  saveVehiculo(newData: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let VehiculoId = newData.VehiculoId;
    let Nombre = newData.Nombre;
    let TipoVehiculo = newData.TipoVehiculo;
    let Capacidad = newData.Capacidad;
    let Conductor = newData.Conductor;
    let Placa = newData.Placa;
    
    let body = JSON.stringify({ VehiculoId, Nombre, TipoVehiculo, Capacidad, Conductor, Placa });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/vehiculos", body, options);
  }

  updateVehiculo(newData: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let VehiculoId = newData.VehiculoId;
    let Nombre = newData.Nombre;
    let TipoVehiculo = newData.TipoVehiculo;
    let Capacidad = newData.Capacidad;
    let Conductor = newData.Conductor;
    let Placa = newData.Placa;
    
    let body = JSON.stringify({ VehiculoId, Nombre, TipoVehiculo, Capacidad, Conductor, Placa });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/vehiculos/" + VehiculoId, body, options);
  }

  deleteVehiculo(vehiculoId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/vehiculos/'+ vehiculoId, { headers });
  }

  getAllReuniones() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();

    let body = JSON.stringify({ });

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.post(this.baseUrl + '/reuniones/GetAllReuniones', body, { headers });
  }

  getReunion(id: number) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();

    let ReunionId = id;
    let body = JSON.stringify({ ReunionId });
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.post(this.baseUrl + '/reuniones/GetReunion', body, { headers });
  }

  saveReunion(newData: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let ReunionId = newData.ReunionId;
    let Nombre = newData.Nombre;
    let FechaInicio = newData.FechaInicio;
    let FechaFin = newData.FechaFin;
    let Encargado = newData.Encargado;
    let Contacto = newData.Contacto;
    let CityId = newData.CityId;
    let Observaciones = newData.Observaciones;
    let UserId = newData.UserId;
    
    let body = JSON.stringify({ ReunionId, Nombre, FechaInicio, FechaFin, Encargado, Contacto, CityId, Observaciones, UserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/reuniones/AddReunion", body, options);
  }

  updateReunion(newData: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let ReunionId = newData.ReunionId;
    let Nombre = newData.Nombre;
    let FechaInicio = newData.FechaInicio;
    let FechaFin = newData.FechaFin;
    let Encargado = newData.Encargado;
    let Contacto = newData.Contacto;
    let CityId = newData.CityId;
    let Observaciones = newData.Observaciones;
    let UserId = newData.UserId;
    
    let body = JSON.stringify({ ReunionId, Nombre, FechaInicio, FechaFin, Encargado, Contacto, CityId, Observaciones, UserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/reuniones/UpdateReunion", body, options);
  }

  deleteReunion(reunionId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let ReunionId = reunionId;
    let body = JSON.stringify({ ReunionId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.post(this.baseUrl + '/reuniones/DeleteReunion', body, { headers });
  }

  deleteCompromiso(compromisoId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let ReunionCompromisoId = compromisoId;
    let body = JSON.stringify({ ReunionCompromisoId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.post(this.baseUrl + '/reuniones/DeleteCompromiso', body, { headers });
  }

  saveVehiculoPersona(data: any, reunionId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let personas: any [] = [];
    let ReunionId = reunionId;

    data.forEach((item)=>{
      personas.push({
        VehiculoId: item.vehiculoId,
        Persona: item.ocupante
      })
    });      
    
    let body = JSON.stringify({ ReunionId, personas });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/reuniones/AddVehiculoReunion", body, options);
  }

  saveCompromiso(newData: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let ReunionCompromisoId = newData.ReunionCompromisoId;
    let Beneficiario = newData.Beneficiario;
    let Documento = newData.Documento;
    let Telefono = newData.Telefono;
    let Fecha = newData.Fecha;
    let TipoSolicitud = newData.TipoSolicitud;
    let Observaciones = newData.Observaciones;
    let Estado = newData.Estado;
    let ReunionId = newData.ReunionId;    
    
    let body = JSON.stringify({ ReunionCompromisoId, Beneficiario, Documento, Telefono, Fecha, TipoSolicitud, Observaciones, Estado, ReunionId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/reuniones/AddCompromiso", body, options);
  }

  saveRegionGasto(newData: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let GastoReunionId = newData.GastoReunionId;
    let Nombre = newData.Nombre;
    let TipoGastoId = newData.TipoGastoId;
    let Beneficiario = newData.Beneficiario;
    let Contacto = newData.Contacto;
    let Monto = newData.Monto;
    let ReunionId = newData.ReunionId;

    let body = JSON.stringify({ GastoReunionId, Nombre, TipoGastoId, Beneficiario, Contacto, Monto, ReunionId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/reuniones/AddGasto", body, options);
  }

  deleteGasto(gastoId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let GastoReunionId = gastoId;
    let body = JSON.stringify({ GastoReunionId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.post(this.baseUrl + '/reuniones/DeleteGasto', body, { headers });
  }


}
