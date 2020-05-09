import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { IncrementadorModule } from '../components/incrementador.module';

import { PagesComponent } from './pages.component';
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
      BrowserModule,
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      IncrementadorModule
   ]
})
export class PagesModule { }