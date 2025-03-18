import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { IProduct } from '../features/products/product.types';
import { ProductsService } from '../features/products/products.service';
import { ProductCardComponent } from '../components/product-card.component';
import { Subscription, switchMap, throwError } from 'rxjs';
import { CategoriesService } from '@app/features/products/categories.service';

@Component({
  selector: 'app-item-list',
  imports: [ProductCardComponent],
  template: `
    <div>
      <p>Resultados: {{ products.length }}</p>
    </div>

    <div class="grid grid-cols-[260px_1fr] gap-8">
      <div>
        <p>Filters</p>
      </div>
      <div class="grid grid-cols-4 gap-x-6 gap-y-6">
        @for (product of products; track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    </div>
  `,
})
export class ProductsPage {
  private _productsService = inject(ProductsService);
  private readonly _categoryService = inject(CategoriesService);
  private _subscriptions = new Subscription();
  public products: IProduct[] = [];
  public categorySlug = input.required<string>({
    alias: 'category',
  });

  public constructor() {
    effect(() => {
      this._subscriptions.add(
        this._categoryService
          .getCategoryBySlug(this.categorySlug())
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
    });
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
    });
  }
}
