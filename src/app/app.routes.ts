import { Routes } from '@angular/router';
import { authGuard, isLoggedGuard } from './auth/auth.guard';
import { HomePageComponent } from './shop/pages/home-page/home-page.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes')
  },
  {
    path: 'wish',
    loadChildren: () => import('./wish/wish.routes')
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
    canActivate: [authGuard],
    loadChildren: () => import('./account/account.routes')
  },
  {
    path: 'auth',
    canActivate: [isLoggedGuard],
    loadChildren: () => import('./auth/auth.routes')
  },
  { path: '**', redirectTo: '' },
];
