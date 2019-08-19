import { Injectable } from '@angular/core';
import { UserProfileModel } from '../../interfaces/user.interface';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _http: Http, private _configService: ConfigService) { 
    this.baseUrl = _configService.getApiURI();
  }

  getSpeciality(specialityId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/specialities/' + specialityId, { headers });
  }

  getAllSpecialities() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/specialities', { headers });
  }

  saveSpeciality(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let Name = data.Name;    

    let body = JSON.stringify({ Name });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/specialities/", body, options);
  }

  updateSpeciality(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let SpecialityId = data.SpecialityId;
    let Name = data.Name;
    

    let body = JSON.stringify({ SpecialityId, Name });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/specialities/" + SpecialityId, body, options);
  }

  deleteSpeciality(specialityId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/specialities/' + specialityId, { headers });
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
      url: this.baseUrl + "/specialities/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }
}
