import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  _apiURI : string;
  _backURI : string;
  constructor() {
    this._apiURI = 'http://localhost:5000/api';
    this._backURI = 'http://localhost:5000/';
    //this._apiURI = 'http://ingeramirez0401-001-site33.itempurl.com/api';
    //this._backURI = 'http://ingeramirez0401-001-site33.itempurl.com/';
  }

  getApiURI() {
    return this._apiURI;
  }

  getBackURI() {
    return this._backURI;
  }
}
