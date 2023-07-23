import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/store/interfaces/product';
import { ProductsService } from "src/app/shop/services/products.service";
import { ProductCardComponent } from 'src/app/shop/components/product-card/product-card.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
})
export class HomePageComponent {
  private _productsService: ProductsService = inject(ProductsService);
  public products: Signal<IProduct[]> = this._productsService.products;

  constructor() {}
}
