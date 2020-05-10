import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  storageName:string = 'setting';

  ajustes:Ajustes = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document,) {
    this.load();
  }

  save(){
    localStorage.setItem(this.storageName, JSON.stringify(this.ajustes));
  }

  load(){
    if(localStorage.getItem(this.storageName)){
      this.ajustes = JSON.parse(localStorage.getItem(this.storageName));
      this.applyTheme(this.ajustes.theme);
    }
  }

  applyTheme(theme:string){
    let url = `assets/css/colors/${ theme }.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.theme = theme;
    this.ajustes.themeUrl = url;

    this.save();
  }
}

interface Ajustes {
  themeUrl:string;
  theme:string;
}
