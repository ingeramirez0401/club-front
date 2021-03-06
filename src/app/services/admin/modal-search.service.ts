import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../../services/services.index';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserProfileModel } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalSearchService {
  public oculto: string = "oculto";
  public rol: string = "";
  public closed: boolean = false;
  baseUrl: string = '';
  userProfile: UserProfileModel;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }
}
