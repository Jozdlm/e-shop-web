import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ProductCardComponent,
    CartPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HomePageComponent]
})
export class StoreModule {
}
