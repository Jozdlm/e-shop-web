import { Routes } from '@angular/router';

const AUTH_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@app/pages/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('@app/pages/signup.page').then((m) => m.SignupPage),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export default AUTH_ROUTES;
