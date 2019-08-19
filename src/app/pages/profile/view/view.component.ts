import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../interfaces/user.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/shared/local-storage.service';
import { SidebarService } from '../../../services/shared/sidebar.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: []
})
export class ProfileViewComponent implements OnInit {

  userProfile: UserProfileModel;
  constructor( private _router: Router, private _localStorage: LocalStorageService, private _sidebarService: SidebarService ) { 
    this.userProfile = this._localStorage.getParsedObject("auth-data");
  }

  ngOnInit() {
    

  }

  editUser() {
    this._router.navigate(['/users','update',this.userProfile.userId]);
  }

  goToHome() {
    this._router.navigate(['/dashboard']);
  }

}
