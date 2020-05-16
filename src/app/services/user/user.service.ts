import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-files/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user:User;
  token:string;
  url = URL_SERVICES;
  urlUsers =  this.url+'/users';

  constructor(public _http:HttpClient, public _router:Router, public _uploadFile:UploadFileService) {
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
        if(localStorage.getItem('token')){
          this.token = localStorage.getItem('token');
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

    // console.log(user);
    return this._http.post(urlLogin, user)
      .pipe(
        map((data:any) => {
          this.localStorage(data, 'save');
          return data;
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

  update(user:User){
    console.log(user);
    let url = this.urlUsers + `/${ this.user._id }?token=${ this.token }`;

    return this._http.put(url, user)
      .pipe(
        map((data:any) => {
          
          let user = {
            id: data.user._id,
            token: this.token,
            user: data.user
          };        
          this.localStorage(user, 'save');

          Swal.fire({
            icon: 'success',
            title: 'USER UPDATED'
          });
          
          return true;
        })
    );
  }

  updateImage(file:File, id:string){
    this._uploadFile.uploadFile(file, 'users', id).then((data:any) => {
      this.user.img = data.users.img;
      let user = {
        id: this.user._id,
        token: this.token,
        user: data.users
      }
      this.localStorage(user, 'save');

      Swal.fire({
        icon: 'success',
        title: 'USER UPDATED'
      });
    })
    .catch(data => {
      console.log(data);
    });
  }

}
