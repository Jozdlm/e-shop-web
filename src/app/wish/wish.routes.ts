import { Routes } from '@angular/router';
import { WishListPageComponent } from './pages/wish-list-page/wish-list-page.component';

const WISH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: WishListPageComponent },
  { path: '**', redirectTo: '' },
];

export default WISH_ROUTES;
