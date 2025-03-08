import { Routes } from '@angular/router';



const AUTH_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadComponent: () => import('../pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('../pages/signup-page/signup-page.component').then(m => m.SignupPageComponent)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

export default AUTH_ROUTES;
