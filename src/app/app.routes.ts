import { Routes } from '@angular/router';
import { isLoggedAuth, isAnonGuard } from './auth/auth.guard';
import { HomePageComponent } from './shop/pages/home-page/home-page.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes')
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./shop/pages/product-detail/product-detail.component').then(
        (c) => c.ProductDetailComponent
      ),
  },
  {
    path: 'account',
    canActivate: [isLoggedAuth],
    loadChildren: () => import('./account/account.routes')
  },
  {
    path: 'auth',
    canActivate: [isAnonGuard],
    loadChildren: () => import('./auth/auth.routes')
  },
  { path: '**', redirectTo: '' },
];
