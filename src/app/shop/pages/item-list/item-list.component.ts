import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../product';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './item-list.component.html',
  styles: [`
    .list-wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 32px;
      row-gap: 24px;
    }
  `],
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
