import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor(public _userService:UserService, public _router:Router) { }

  confirmField(field1:string, field2:string){
  
    return (group: FormGroup) => {
      
      let f1 = group.controls[field1].value;
      let f2 = group.controls[field2].value;

      if(f1 === f2){
        return null;
      }

      return {
        same: true
      };
    };

  }

  ngOnInit(): void {
    init_plugins();

    this.form = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      conditions: new FormControl(false)
    }, { validators: this.confirmField('password', 'password2') });

    this.form.setValue({
      firstname: '',
      lastname: 'Test',
      email: '@testing.com',
      password: '123456',
      password2: '123456',
      conditions: false
    });
  }

  register(){
    if(this.form.invalid){
      return;
    }

    if(!this.form.value.conditions){
      Swal.fire({
        icon: 'warning',
        title: 'IMPORTANTE',
        text: 'Será necesario aceptar todos los terminos.'
      });
      return;
    }

    let user = new User(
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.email,
      this.form.value.password
    );

    this._userService.create(user).subscribe( data => this._router.navigate(['/login']));
  }

}
