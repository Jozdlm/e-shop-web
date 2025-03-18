import { Routes } from '@angular/router';

const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('@app/pages/my-account.page').then((m) => m.MyAccountPage),
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
];

export default ACCOUNT_ROUTES;
