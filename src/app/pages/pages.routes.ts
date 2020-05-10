import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas01Component } from './graficas01/graficas01.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesRoutes: Routes = [
   { path: '', component: PagesComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'graphic01', component: Graficas01Component },
        { path: 'settings', component: AccountSettingsComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full', }
      ]
   }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );