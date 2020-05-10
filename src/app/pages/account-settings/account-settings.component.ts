import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _settings:SettingsService) { }

  ngOnInit(): void {
    this.setCheck();
  }

  changeColor(theme:string, link:any){
    this.applyCheck(link);
    
    this._settings.applyTheme(theme);
  }

  applyCheck(link:any){
    let selectores:any = document.getElementsByClassName('selector');

    for(let ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  setCheck(){
    let selectores:any = document.getElementsByClassName('selector');
    let theme = this._settings.ajustes.theme;

    for(let ref of selectores){
      if(ref.getAttribute('data-theme') == theme){
        ref.classList.add('working');
        break;
      }
    }
  }

}
