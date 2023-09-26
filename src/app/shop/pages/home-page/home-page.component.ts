import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/shop/services/products.service';
import { ProductCardComponent } from 'src/app/shop/components/product-card/product-card.component';
import { from } from 'rxjs';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    SearchInputComponent,
    RouterModule,
  ],
})
export class HomePageComponent {
  private _productsService: ProductsService = inject(ProductsService);
  public products = from(this._productsService.getProducts());

  constructor() {}
}
