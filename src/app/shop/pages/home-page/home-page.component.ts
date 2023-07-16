import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/store/interfaces/product';
import { ProductCardComponent } from 'src/app/store/components/product-card/product-card.component';
import { ProductsService } from "src/app/shop/services/products.service";

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
