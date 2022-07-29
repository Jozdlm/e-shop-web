import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HomePageComponent]
})
export class StoreModule {
}
