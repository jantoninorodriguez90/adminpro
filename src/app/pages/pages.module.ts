import { NgModule } from "@angular/core";

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas01Component } from './graficas01/graficas01.component';



@NgModule({
   declarations: [
      DashboardComponent,
      ProgressComponent,
      Graficas01Component,
      PagesComponent
   ],
   exports: [
      DashboardComponent,
      ProgressComponent,
      Graficas01Component,
      PagesComponent
   ],
   imports: [
      SharedModule,
      PAGES_ROUTES
   ]
})
export class PagesModule { }