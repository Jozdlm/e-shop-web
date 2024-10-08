import { Routes } from '@angular/router';
import { isLoggedAuth, isAnonGuard } from '../auth/auth.guard';
import { HomePageComponent } from '@app/pages/home-page/home-page.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'cart',
    loadChildren: () => import('./cart.routes'),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('../pages/product-detail/product-detail.component').then(
        (c) => c.ProductDetailComponent
      ),
  },
  {
    path: 'shop/:category',
    loadComponent: () =>
      import('../pages/item-list/item-list.component').then(
        (c) => c.ItemListComponent
      ),
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms.routes'),
  },
  {
    path: 'account',
    canActivate: [isLoggedAuth],
    loadChildren: () => import('./account.routes'),
  },
  {
    path: 'auth',
    canActivate: [isAnonGuard],
    loadChildren: () => import('./auth.routes'),
  },
  { path: '**', redirectTo: '' },
];
