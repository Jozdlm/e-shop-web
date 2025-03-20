import { Routes } from '@angular/router';
import { Pages } from './pages';

export const APP_ROUTES: Routes = [
  {
    path: Pages.HOME,
    loadComponent: () => import('@app/pages/home.page').then((m) => m.HomePage),
    pathMatch: 'full',
  },
  {
    path: Pages.CART,
    loadComponent: () => import('@app/pages/cart.page').then((m) => m.CartPage),
  },
  {
    path: Pages.CHECKOUT,
    loadComponent: () =>
      import('@app/pages/checkout.page').then((m) => m.CheckoutPage),
  },
  {
    path: Pages.PRODUCT_DETAIL,
    loadComponent: () =>
      import('@app/pages/product-detail.page').then((c) => c.ProductDetailPage),
  },
  {
    path: Pages.PRODUCTS,
    loadComponent: () =>
      import('@app/pages/products.page').then((c) => c.ProductsPage),
  },
  {
    path: 'shop/:category',
    loadComponent: () =>
      import('@app/pages/products.page').then((c) => c.ProductsPage),
  },
  {
    path: Pages.ABOUT_US,
    loadComponent: () =>
      import('@app/pages/about-us.page').then((m) => m.AboutUsPage),
  },
  {
    path: Pages.CONTACT,
    loadComponent: () =>
      import('@app/pages/contact.page').then((m) => m.ContactPage),
  },
  {
    path: Pages.TERMS_CONDITIONS,
    loadComponent: () =>
      import('@app/pages/terms-conditions.page').then(
        (m) => m.TermsConditionsPage,
      ),
  },
  {
    path: Pages.PRIVACY_POLICY,
    loadComponent: () =>
      import('@app/pages/privacy-policy.page').then((m) => m.PrivacyPolicyPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@app/pages/not-found.page').then((m) => m.NotFoundPage),
  },
];
