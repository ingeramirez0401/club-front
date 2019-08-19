import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { ReunionesService } from '../../services/admin/reuniones.service';
import { LocalStorageService } from '../../services/shared/local-storage.service';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UserService } from '../../services/admin/user.service';

declare var c3: any;
declare var $: any;
declare var moment: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  userProfile: any;
  title: string = "";
  constructor(private _reunionesService: ReunionesService, private _router: Router, private _localStorage: LocalStorageService, private _sidebarService: SidebarService, private _userService: UserService) {
    this.userProfile = this._localStorage.getParsedObject("auth-data");
    this.title = this.userProfile.firstName + " " + this.userProfile.lastName;
  }

  ngOnInit() {   
  }
}
