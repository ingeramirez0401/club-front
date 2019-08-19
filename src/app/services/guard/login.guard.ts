import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileModel } from '../../interfaces/user.interface';
import { LocalStorageService, UserService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  userProfile: UserProfileModel;
  constructor( private _userService: UserService, private _router: Router, private _localStorage: LocalStorageService ) { 
    this.userProfile = this._localStorage.getParsedObject("auth-data");
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this._userService.isLoggedIn()){
      return true;
    }else{
      this._router.navigate(['/login']);
      return false
    }
  }
}
