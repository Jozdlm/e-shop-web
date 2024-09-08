import { Routes } from '@angular/router';
import { MyAccountComponent } from '../pages/my-account/my-account.component';

const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'profile',
    component: MyAccountComponent
  },
  {
    path: '**',
    redirectTo: 'profile'
  }
];

export default ACCOUNT_ROUTES;
