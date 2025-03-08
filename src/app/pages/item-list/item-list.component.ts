import { Component, DestroyRef, Input, inject } from '@angular/core';

import { IProduct } from '../../shop/product';
import { ProductsService } from '../../shop/products.service';
import { ProductCardComponent } from '../../shop/components/product-card/product-card.component';
import { Subscription, switchMap, tap, throwError } from 'rxjs';
import { CategoriesService } from '@app/shop/categories.service';

@Component({
    selector: 'app-item-list',
    imports: [ProductCardComponent],
    templateUrl: './item-list.component.html',
    styles: [
        `
      .list-wrapper {
        display: grid;
        grid-template-columns: 260px 1fr;
        column-gap: 32px;
      }
    `,
    ]
})
export class ItemListComponent {
  private _productsService = inject(ProductsService);
  private readonly _categoryService = inject(CategoriesService);
  private _subscriptions = new Subscription();
  public products: IProduct[] = [];

  public constructor() {
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
    });
  }

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  public set category(categorySlug: string) {
    this._subscriptions.add(
      this._categoryService
        .getCategoryBySlug(categorySlug)
        .pipe(
          switchMap((result) => {
            if (result?.id) {
              return this._productsService.getProductsByCategory(result.id);
            }
            return throwError(() => new Error('Category not found'));
          }),
        )
        .subscribe((arr: IProduct[]) => (this.products = arr)),
    );
  }
}
