import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styles: [],
})
export class ItemListComponent {
  private _productsService: ProductsService = inject(ProductsService);
  public products: IProduct[] = [];

  @Input()
  public set category(categorySlug: string) {
    this._productsService
      .getProductsByCategory(categorySlug)
      .subscribe((arr: IProduct[]) => (this.products = arr));
  }
}
