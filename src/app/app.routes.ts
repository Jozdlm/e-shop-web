import { Routes } from '@angular/router';

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
    path: 'about-us',
    loadComponent: () =>
      import('@app/pages/about-us.page').then((m) => m.AboutUsPage),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('@app/pages/contact.page').then((m) => m.ContactPage),
  },
  {
    path: 'terms-conditions',
    loadComponent: () =>
      import('@app/pages/terms-conditions.page').then(
        (m) => m.TermsConditionsPage,
      ),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('@app/pages/privacy-policy.page').then((m) => m.PrivacyPolicyPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@app/pages/not-found.page').then((m) => m.NotFoundPage),
  },
];
