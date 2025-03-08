import { Routes } from "@angular/router";





const CMS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('../pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('../pages/products-page/products-page.component').then(m => m.ProductsPageComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('../pages/categories-page/categories-page.component').then(m => m.CategoriesPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default CMS_ROUTES;
