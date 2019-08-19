import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../interfaces/user.interface';
import { LocalStorageService, SidebarService, UserService } from '../../services/services.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  userProfile: UserProfileModel;
  constructor( private _localStorage: LocalStorageService, private _sidebarService: SidebarService, public _userService: UserService ) { }

  ngOnInit() {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
  }


}
