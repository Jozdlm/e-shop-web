import { Routes } from "@angular/router";
import { CartPageComponent } from "./store/pages/cart-page/cart-page.component";
import { HomePageComponent } from "./store/pages/home-page/home-page.component";

export const APP_ROUTES: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'shopping-cart', component: CartPageComponent },
  { path: '**', redirectTo: '' },
];
