import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { UserProfileModel, UserModel } from '../../interfaces/user.interface';
import { ConfigService, LocalStorageService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = '';
  public loggedIn = false;
  userProfile: UserProfileModel;
  tokenData: any;

  public userData: UserProfileModel;

  constructor( private _configService: ConfigService, private _localStorage: LocalStorageService, private _http: Http ) {
    this.loggedIn = !!this._localStorage.get('auth-data');
    this.baseUrl = this._configService.getApiURI();

    this.userData = this._localStorage.getParsedObject("auth-data");
  }

  register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<any> {
    let body = JSON.stringify({ email, password, firstName, lastName, location });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/accounts", body, options);
  }

  login(UserName: string, Password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json, charset=utf-8');
    headers.append('Accept', 'application/json');
    let body = JSON.stringify({ UserName, Password })
    return this._http.post(this.baseUrl + '/auth/login', body, { headers });
  }

  logout() {
    this._localStorage.remove('auth-data');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  updateLocalData(data: UserProfileModel){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    let newUserProfile: UserProfileModel = {
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      genreId: data.genreId,
      genreName: data.genreName,
      countryId: data.countryId,
      countryName: data.countryName,
      departmentId: data.departmentId,
      departmentName: data.departmentName,
      cityId: data.cityId,
      cityName: data.cityName,
      fullName: data.fullName,
      role: data.role,
      category: data.category,
      userEmail: data.userEmail,
      password: data.password,
      imageUrl: data.imageUrl,
      auth_token: this.userProfile.auth_token,
      menu: data.menu
    };

    //Borro el que esté actualmente y agrego el nuevo modelo
    this._localStorage.remove('auth-data');
    this._localStorage.setObject("auth-data", newUserProfile);
    this.userData = this._localStorage.getParsedObject("auth-data");
  }

  getUser(userId: number){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/users/'+userId, { headers });
  }

  getAllUsers() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/users', { headers });
  }

  saveProfile(user: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let UserId = user.UserId;
    let FirstName = user.FirstName;
    let LastName = user.LastName;
    let CityId = user.CityId;
    let Address = user.Address;
    let GenreId = user.GenreId;
    let Phone = user.Phone;
    let UserName = user.UserName;
    let Password = user.Password;

    let body = JSON.stringify({ UserId, FirstName, LastName, CityId, Address, GenreId, Phone, UserName, Password });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/users/" + UserId, body, options);
  }

  saveUser(user: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let FirstName = user.FirstName;
    let LastName = user.LastName;
    let DocumentTypeId = user.DocumentTypeId;
    let Document = user.Document;
    let Address = user.Address;
    let CityId = user.CityId;    
    let GenreId = user.GenreId;    
    let Phone = user.Phone;
    let CellPhone = user.Phone;
    let Email = user.Email;
    let DateOfBirth = user.DateOfBirth;
    let PersonTypeId = user.PersonTypeId;
    let Password = user.Password;
    let Salario = user.Salario;
    let ProfileId = 1;

    let body = JSON.stringify({ FirstName, LastName, DocumentTypeId, Document, CityId, GenreId, Address, Phone, CellPhone, Email, DateOfBirth, PersonTypeId, Password, Salario, ProfileId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/users/", body, options);
  }

  updateUser(user: any){
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let UserId = user.UserId;
    let FirstName = user.FirstName;
    let LastName = user.LastName;
    let DocumentTypeId = user.DocumentTypeId;
    let Document = user.Document;
    let Address = user.Address;
    let CityId = user.CityId;    
    let GenreId = user.GenreId;    
    let Phone = user.Phone;
    let CellPhone = user.Phone;
    let Email = user.Email;
    let DateOfBirth = user.DateOfBirth;
    let PersonTypeId = user.PersonTypeId;
    let Password = user.Password;
    let Salario = user.Salario;
    let ProfileId = 1;
    let PersonId = user.PersonId;

    let body = JSON.stringify({ UserId, PersonId, FirstName, LastName, DocumentTypeId, Document, CityId, GenreId, Address, Phone, CellPhone, Email, DateOfBirth, PersonTypeId, Password, Salario, ProfileId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/users/" + PersonId, body, options);
  }

  deleteUser(userId: number){
    console.log(userId);
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.delete(this.baseUrl + '/users/'+userId, { headers });
  }
}
