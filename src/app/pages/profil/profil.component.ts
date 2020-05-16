import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styles: []
})
export class ProfilComponent implements OnInit {

  user:User;
  uploadImage:File;
  tempImage:string;

  constructor(public _userService:UserService) { 
    this.user = _userService.user;
  }

  ngOnInit(): void {
  }


  save(user:User){
    this.user.firstname = user.firstname;
    this.user.lastname = user.lastname;
    if(this.user.auth == 'google'){
      user.email = this.user.email;  
    }else{
      this.user.email = user.email;
    }
    
    this._userService.update(user).subscribe();
  }

  selectImage(file:File){
    if(!file){
      this.uploadImage = null;
      return;
    }

    if(file.type.indexOf('image') < 0){
      Swal.fire({
        icon: 'warning',
        title: 'SOLO IMAGENES'
      });
      this.tempImage = null;
      return;
    }
    this.uploadImage = file;

    let reader = new FileReader();
    let urlTempImage = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.tempImage = String(reader.result);
    };
  }

  updateImage(){
    this._userService.updateImage(this.uploadImage, this.user._id);
  }
}
