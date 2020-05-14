import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user:User;
  token:string;
  url = URL_SERVICES;
  urlUsers =  this.url+'/users';

  constructor(public _http:HttpClient, public _router:Router) {
    this.localStorage(null, 'load');
  }

  statusLogged(){
    return (this.token.length > 5)?true:false;
  }


  localStorage(data:any, type:string){

    switch(type){
      case 'save':
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    
        this.user = data.user;
        this.token = data.token;
      break;

      case 'load':
        if(localStorage.getItem('toke')){
          this.token = localStorage.getItem('toke');
          this.user = JSON.parse(localStorage.getItem('user'));
        }else{
          this.token = '';
          this.user = null;
        }
      break;

      case 'delete':        
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this._router.navigate(['/login']);
      break;
    }
    
  }

  logout(){
    this.user = null;
    this.token =  '';
  
    this.localStorage(null, 'delete');
  }

  loginGoogle(token:string){
    let urlLogin = this.url+'/login/google';

    return this._http.post(urlLogin, { token: token })
      .pipe(
        map((data:any) => {
          this.localStorage(data, 'save');
          return true;
        })
    );

  }

  login(user:User, remember:boolean = false, auth:string = 'default'){
    
    let urlLogin = this.url+'/login';

    if(remember){
      localStorage.setItem('email', user.email);
    }else{
      localStorage.removeItem('email');
    }


    return this._http.post(urlLogin, user)
      .pipe(
        map((data:any) => {
          this.localStorage(data, 'save');
          return true;
        })
    );

  }

  create(user:User){

    return this._http.post(this.urlUsers, user)
      .pipe(
        map((data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'USER CREATED',
            text: 'User '+data.user.email+' success'
          });
          return data.user;
        })
    );

  }



}
