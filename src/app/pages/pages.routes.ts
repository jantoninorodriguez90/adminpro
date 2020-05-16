import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas01Component } from './graficas01/graficas01.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfilComponent } from './profil/profil.component';

const pagesRoutes: Routes = [
   { path: '', component: PagesComponent, canActivate: [ LoginGuardGuard ],
      children: [
        { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
        { path: 'graphic01', component: Graficas01Component, data: { title: 'Graphics' } },
        { path: 'promises', component: PromesasComponent, data: { title: 'Promise' } },
        { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
        { path: 'settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
        { path: 'profile', component: ProfilComponent, data: { title: 'Profile' } },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full', }
      ]
   }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );