import { Component } from '@angular/core';
import { UserProfileModel } from './interfaces/user.interface';
import { SidebarService } from './services/shared/sidebar.service';
import { LocalStorageService } from './services/shared/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userProfile: UserProfileModel;
  constructor( private _sidebarService: SidebarService, private _localStorage: LocalStorageService ) {
      this._sidebarService.menu = [];
      this._sidebarService.menu = this._localStorage.getParsedObject("dipro-menu");
  }
}
