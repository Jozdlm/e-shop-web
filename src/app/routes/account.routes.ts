import { Routes } from '@angular/router';


const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'profile',
    loadComponent: () => import('../pages/my-account/my-account.component').then(m => m.MyAccountComponent)
  },
  {
    path: '**',
    redirectTo: 'profile'
  }
];

export default ACCOUNT_ROUTES;
