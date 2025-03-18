import { Routes } from '@angular/router';

const CART_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@app/pages/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('@app/pages/checkout.page').then((m) => m.CheckoutPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default CART_ROUTES;
