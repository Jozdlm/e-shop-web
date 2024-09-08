import { Routes } from "@angular/router";
import { DashboardPageComponent } from "../pages/dashboard-page/dashboard-page.component";
import { ProductsPageComponent } from "../pages/products-page/products-page.component";
import { CategoriesPageComponent } from "../pages/categories-page/categories-page.component";


const CMS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardPageComponent
  },
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: 'categories',
    component: CategoriesPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default CMS_ROUTES;
