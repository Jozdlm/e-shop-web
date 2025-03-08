import { Routes } from '@angular/router';



const CART_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('../pages/cart-page/cart-page.component').then(m => m.CartPageComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('../pages/checkout-page/checkout-page.component').then(m => m.CheckoutPageComponent),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default CART_ROUTES;
