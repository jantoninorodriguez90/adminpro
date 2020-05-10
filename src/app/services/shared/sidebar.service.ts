import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-guage',
      submenu: [
        { title: 'Dashboard', url: '/dashboard'},
        { title: 'ProgressBar', url: '/progress'},
        { title: 'Graphics', url: '/graphic01'},
      ]
    }
  ];

  constructor() { }
}
