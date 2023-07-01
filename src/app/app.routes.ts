import { Routes } from '@angular/router';
import { HomePageComponent } from './store/pages/home-page/home-page.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { 
    path: 'cart', 
    loadChildren: () => import('./cart/cart.routes')
  },
  { 
    path: 'wish-list', 
    loadComponent: () => import('./shop/pages/wish-list-page/wish-list-page.component')
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
    path: 'my-account',
    loadComponent: () =>
      import('./account/pages/my-account/my-account.component').then(
        (c) => c.MyAccountComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
