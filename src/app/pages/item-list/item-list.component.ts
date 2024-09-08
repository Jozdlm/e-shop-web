import { Component, DestroyRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../shop/product';
import { ProductsService } from '../../shop/services/products.service';
import { ProductCardComponent } from '../../shop/components/product-card/product-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './item-list.component.html',
  styles: [
    `
      .list-wrapper {
        display: grid;
        grid-template-columns: 260px 1fr;
        column-gap: 32px;
      }
    `,
  ],
})
export class ItemListComponent {
  private _productsService = inject(ProductsService);
  private _subscriptions = new Subscription();
  public products: IProduct[] = [];

  public constructor() {
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
    });
  }

  @Input()
  public set category(categorySlug: string) {
    this._subscriptions.add(
      this._productsService
        .getProductsByCategory(categorySlug)
        .subscribe((arr: IProduct[]) => (this.products = arr))
    );
  }
}
