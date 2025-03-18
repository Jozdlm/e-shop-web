import { Routes } from '@angular/router';
import { isLoggedAuth, isAnonGuard } from './auth/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/pages/home.page').then((m) => m.HomePage),
    pathMatch: 'full',
  },
  {
    path: 'cart',
    loadComponent: () => import('@app/pages/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('@app/pages/checkout.page').then((m) => m.CheckoutPage),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('@app/pages/product-detail.page').then((c) => c.ProductDetailPage),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('@app/pages/products.page').then((c) => c.ProductsPage),
  },
  {
    path: 'shop/:category',
    loadComponent: () =>
      import('@app/pages/products.page').then((c) => c.ProductsPage),
  },
  {
    path: 'my-account',
    canActivate: [isLoggedAuth],
    loadComponent: () =>
      import('@app/pages/my-account.page').then((m) => m.MyAccountPage),
  },
  {
    path: 'auth',
    canActivate: [isAnonGuard],
    children: [
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
    ],
  },
  { path: '**', redirectTo: '' },
];
