import { Injectable, Inject } from '@angular/core';
import { LocalStorageService } from '../services.index';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    urlTheme: 'assets/css/colors/default-dark.css',
    theme: 'default-dark'
  }

  constructor( @Inject(DOCUMENT) private _document, private _localStorage: LocalStorageService ) { 
    this.loadSettings();
  }

  saveSettings() {
    this._localStorage.set('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if(this._localStorage.get('settings')){
      this.settings = this._localStorage.getParsedObject('settings');
    }
    
    this.changeSettings(this.settings.theme);
  }

  changeSettings( color: string ) {
    let url = 'assets/css/colors/';
    this._document.getElementById('tema').setAttribute('href', url + color + '.css');

    this.settings.theme = color;
    this.settings.urlTheme = url;

    this.saveSettings();
  }
}

interface Settings {
  urlTheme: string;
  theme: string;
}
