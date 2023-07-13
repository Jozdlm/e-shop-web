import { Routes } from '@angular/router';
import { HomePageComponent } from './store/pages/home-page/home-page.component';
import { authGuard, isLoggedGuard } from './auth/auth.guard';

export const APP_ROUTES: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes')
  },
  {
    path: 'wish-list',
    loadComponent: () => import('./wish/pages/wish-list-page/wish-list-page.component')
      .then(c => c.WishListPageComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./store/pages/product-detail/product-detail.component').then(
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
