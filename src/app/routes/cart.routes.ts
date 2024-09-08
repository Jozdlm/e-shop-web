import { Routes } from '@angular/router';
import { CartPageComponent } from '../pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from '../pages/checkout-page/checkout-page.component';

const CART_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default CART_ROUTES;
