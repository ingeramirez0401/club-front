import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserProfileModel } from '../../interfaces/user.interface';
import { LocalStorageService, ConfigService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;


  apiUrl: string = "https://belfry.kowi.co/api/v1";
  userName: string = "joer04011992@gmail.com";
  password: string = "ABC123456";
  capsule_key:string = "3"; //CAPSULE_ID
  group_key:string = ""; //GROUP ID
  pipeline_key = "";
  template = "";
  constructor(private _http: Http, private _localStorage: LocalStorageService, private _configService: ConfigService) { 
    this.baseUrl = this._configService.getApiURI();
  }

  authenticate() {
    let email = this.userName;
    let password = this.password;

    let body = JSON.stringify({ email, password });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.apiUrl + "/authenticate", body, options);
  }

  sendRawSms(sms: any, token: string) {
    let message = sms.message;
    let capsule_key = this.capsule_key;
    let group_key = this.group_key;
    let pipeline_key = this.pipeline_key;
    let template = this.template;
    let location = "COL";
    let recipients = sms.recipients;

    let body = JSON.stringify({ message, pipeline_key, capsule_key, group_key, template, location, recipients });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.apiUrl + "/sms/sendRaw", body, options);
  }

  getAllAsistentes() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    let body = JSON.stringify({});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.post(this.baseUrl + '/dialogos/getAsistentes', body, { headers });
  }

  AsistentesSendReady() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let body = JSON.stringify({});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.post(this.baseUrl + '/dialogos/SendReady', body, { headers });
  }

}
