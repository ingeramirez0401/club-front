import { Injectable } from '@angular/core';
import { UserProfileModel } from '../../interfaces/user.interface';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, Request, RequestMethod, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _http: Http, private _configService: ConfigService) { 
    this.baseUrl = _configService.getApiURI();
  }

  getSystem(systemId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/systems/' + systemId, { headers });
  }

  getAllSystems() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/systems', { headers });
  }

  saveSystem(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let Name = data.Name;
    let LineId = data.LineId;    

    let body = JSON.stringify({ Name, LineId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/systems/", body, options);
  }

  updateSystem(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let SystemId = data.SystemId;
    let Name = data.Name;
    let LineId = data.LineId;
    

    let body = JSON.stringify({ SystemId, Name, LineId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/systems/" + SystemId, body, options);
  }

  deleteSystem(systemId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/systems/' + systemId, { headers });
  }

  uploadExcelFile( file: File ) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/systems/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }
}
