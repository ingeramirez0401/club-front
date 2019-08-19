import { Injectable } from '@angular/core';
import { UserProfileModel } from '../../interfaces/user.interface';
import { LocalStorageService } from '../services.index';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {
userProfile: UserProfileModel;
menu: any [] = [];
  constructor(private _localStorage: LocalStorageService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
  }
}
