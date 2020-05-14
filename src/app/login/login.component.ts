import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {

  email:string;
  remember = false;
  auth2:any;

  constructor(public _router:Router, public _userService:UserService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.remember = true;
    }
  }

  // --------------------------------------------------------
  // Login con Google
  // --------------------------------------------------------
  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '116923259627-6ta2prndp2gjfpbq34iq7k0ddkb090m9.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (data) => {
      // let profile = data.getBasicProfile();
      let token = data.getAuthResponse().id_token;

      this._userService.loginGoogle(token).subscribe(data => {
        window.location.href = '#/dashboard';
      });
    });
  }
  // --------------------------------------------------------
  // Login por Web
  // --------------------------------------------------------
  login(form:NgForm){
    if(form.invalid){
      return;
    }

    let user = new User(null, null, form.value.email, form.value.password);
    
    this._userService.login(user, form.value.remember).subscribe(data => this._router.navigate(['/dashboard']));
  }
  // --------------------------------------------------------

}
