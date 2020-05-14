import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  
  constructor(public _userService:UserService, public _router:Router){}
  
  canActivate(){

    if(this._userService.statusLogged()){
      // console.log('entro al login guard');
      return true;
    }else{
      // console.log('bloqueado por el guard');
      this._router.navigate(['/login']);
      return false;
    }
    
  }
  
}
