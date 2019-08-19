import { Injectable } from '@angular/core';
import { UserProfileModel } from 'src/app/interfaces/user.interface';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _http: Http, private _configService: ConfigService) { 
    this.baseUrl = _configService.getApiURI();
  }

  getProductType(productTypeId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/producttypes/' + productTypeId, { headers });
  }

  getAllProductTypes() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/producttypes', { headers });
  }

  saveProductType(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let Name = data.Name;

    let body = JSON.stringify({ Name });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/producttypes/", body, options);
  }

  updateProductType(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let ProductTypeId = data.ProductTypeId;
    let Name = data.Name;
    

    let body = JSON.stringify({ ProductTypeId, Name });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/producttypes/" + ProductTypeId, body, options);
  }

  deleteProductType(productTypeId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/producttypes/' + productTypeId, { headers });
  }
}
