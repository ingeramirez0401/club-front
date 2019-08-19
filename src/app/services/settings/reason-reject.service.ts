import { Injectable } from '@angular/core';
import { UserProfileModel } from '../../interfaces/user.interface';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ReasonRejectService {
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _http: Http, private _configService: ConfigService) { 
    this.baseUrl = _configService.getApiURI();
  }

  getReason(reasonId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/reasons/' + reasonId, { headers });
  }

  getAllReasons() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/reasons', { headers });
  }

  saveReason(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let Name = data.Name;
    

    let body = JSON.stringify({ Name });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/reasons/", body, options);
  }

  updateReason(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let ReasonId = data.ReasonId;
    let Name = data.Name;
    

    let body = JSON.stringify({ ReasonId, Name });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/reasons/" + ReasonId, body, options);
  }

  deleteReason(reasonId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/reasons/' + reasonId, { headers });
  }
}
