import { Injectable } from '@angular/core';
import { UserProfileModel } from 'src/app/interfaces/user.interface';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _http: Http, private _configService: ConfigService) { 
    this.baseUrl = _configService.getApiURI();
  }

  getAllCountries() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/countries', { headers });
  }

  getAllDepartments(id: number) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/departments/' + id, { headers });
  }

  getAllCities(id: number) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/cities/' + id, { headers });
  }

  getSupplier(supplierId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/suppliers/' + supplierId, { headers });
  }

  getAllSuppliers() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/suppliers', { headers });
  }

  saveSuplier(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let Name = data.Name;
    let DocumentTypeId = data.DocumentTypeId;
    let Document = data.Document;
    let Regime = data.Regime;
    let CompanyType = data.CompanyType;
    let SupplierTypeId = data.SupplierTypeId;
    let Address = data.Address;
    let CityId = data.CityId;
    let Phone1 = data.Phone1;
    let Phone2 = data.Phone2;
    let Fax = data.Fax;
    let TypeOfActivity = data.TypeOfActivity;
    let CiiuCode = data.CiiuCode;
    let EconActDescription = data.EconActDescription;
    let LegalPersonName = data.LegalPersonName;
    let LegalPersonFec = data.LegalPersonFec;
    let LegalPersonDocTypeId = data.LegalPersonDocTypeId;
    let LegalPersonDocument = data.LegalPersonDocument;
    let LegalPersonPhone = data.LegalPersonPhone;
    let LegalPersonCellPhone = data.LegalPersonCellPhone;
    let LegalPersonEmail = data.LegalPersonEmail;
    let MoneyTypeId = data.MoneyTypeId;
    let Observations = data.Observations;
    let LogoUrl = data.LogoUrl;

    let body = JSON.stringify({ Name,
                                DocumentTypeId,
                                Document,
                                Regime,
                                CompanyType,
                                SupplierTypeId,
                                Address,
                                CityId,
                                Phone1,
                                Phone2,
                                Fax,
                                TypeOfActivity,
                                CiiuCode,
                                EconActDescription,
                                LegalPersonName,
                                LegalPersonFec,
                                LegalPersonDocTypeId,
                                LegalPersonDocument,
                                LegalPersonPhone,
                                LegalPersonCellPhone,
                                LegalPersonEmail,
                                MoneyTypeId,
                                Observations,
                                LogoUrl });
    
                                console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/suppliers/", body, options);
  }

  updateSupplier(data: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let SupplierId = data.SupplierId;
    let Name = data.Name;
    let DocumentTypeId = data.DocumentTypeId;
    let Document = data.Document;
    let Regime = data.Regime;
    let CompanyType = data.CompanyType;
    let SupplierTypeId = data.SupplierTypeId;
    let Address = data.Address;
    let CityId = data.CityId;
    let Phone1 = data.Phone1;
    let Phone2 = data.Phone2;
    let Fax = data.Fax;
    let TypeOfActivity = data.TypeOfActivity;
    let CiiuCode = data.CiiuCode;
    let EconActDescription = data.EconActDescription;
    let LegalPersonName = data.LegalPersonName;
    let LegalPersonFec = data.LegalPersonFec;
    let LegalPersonDocTypeId = data.LegalPersonDocTypeId;
    let LegalPersonDocument = data.LegalPersonDocument;
    let LegalPersonPhone = data.LegalPersonPhone;
    let LegalPersonCellPhone = data.LegalPersonCellPhone;
    let LegalPersonEmail = data.LegalPersonEmail;
    let MoneyTypeId = data.MoneyTypeId;
    let Observations = data.Observations;
    let LogoUrl = data.LogoUrl;

    let body = JSON.stringify({ SupplierId, Name,
                                DocumentTypeId,
                                Document,
                                Regime,
                                CompanyType,
                                SupplierTypeId,
                                Address,
                                CityId,
                                Phone1,
                                Phone2,
                                Fax,
                                TypeOfActivity,
                                CiiuCode,
                                EconActDescription,
                                LegalPersonName,
                                LegalPersonFec,
                                LegalPersonDocTypeId,
                                LegalPersonDocument,
                                LegalPersonPhone,
                                LegalPersonCellPhone,
                                LegalPersonEmail,
                                MoneyTypeId,
                                Observations,
                                LogoUrl });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/suppliers/" + SupplierId, body, options);
  }

  deleteSupplier(supplierId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/suppliers/' + supplierId, { headers });
  }
}
