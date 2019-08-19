import { Injectable } from '@angular/core';
import { UserProfileModel } from '../../interfaces/user.interface';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, Request, RequestMethod, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _http: Http, private _configService: ConfigService) { 
    this.baseUrl = _configService.getApiURI();
  }

  getLine(lineId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/lines/' + lineId, { headers });
  }

  getAllLines() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/lines', { headers });
  }

  saveLine(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let Name = data.Name;
    let SpecialityId = data.SpecialityId;    

    let body = JSON.stringify({ Name, SpecialityId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/lines/", body, options);
  }

  updateLine(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let LineId = data.LineId;
    let Name = data.Name;
    let SpecialityId = data.SpecialityId;
    

    let body = JSON.stringify({ LineId, Name, SpecialityId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/lines/" + LineId, body, options);
  }

  deleteLine(lineId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/lines/' + lineId, { headers });
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
      url: this.baseUrl + "/lines/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }
}
