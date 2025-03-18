import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@app/features/products/products.service';
import { ProductCardComponent } from '@app/components/product-card/product-card.component';
import { SearchInputComponent } from '@app/components/search-input/search-input.component';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '@app/features/products/categories.service';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    ProductCardComponent,
    SearchInputComponent,
    RouterModule,
  ],
  template: `
    <div
      class="relative z-10 mb-10 flex h-[400px] w-full items-center overflow-hidden rounded-xl bg-[url('assets/images/banner.png')] from-black bg-cover bg-center bg-no-repeat px-10 before:absolute before:inset-0 before:z-[-5] before:block before:bg-gradient-to-r before:from-slate-950 before:to-transparent before:opacity-80 before:content-['']"
    >
      <div>
        <div class="mb-6">
          <h1 class="mb-2 text-2xl font-medium text-gray-50">
            Bienvenido a nuestra tienda!
          </h1>
          <p class="w-96 text-sm text-gray-50">
            Te invitamos a ver nuestro catalogo de productos o puedes buscar uno
            en específico.
          </p>
        </div>
        <app-search-input />
      </div>
    </div>

    <div>
      <div class="mb-8">
        <div class="grid grid-cols-4 gap-3">
          @for (category of categories$ | async; track category.id) {
            <a
              class="rounded-lg border border-gray-300 px-3 py-2 h-36"
              [routerLink]="['shop', category.slug]"
            >
              <p>{{ category.name }}</p>
            </a>
          }
        </div>
      </div>
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-medium">Productos</h2>
        <a
          routerLink="products"
          class="text-sm text-neutral-700 hover:text-black"
          >Ver todos los productos</a
        >
      </div>
      <div class="grid grid-cols-5 gap-4">
        @for (product of products | async; track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    </div>
  `,
})
export class HomePage {
  private _productsService: ProductsService = inject(ProductsService);
  private _categoriesService: CategoriesService = inject(CategoriesService);
  public products = this._productsService.getStarredProducts();
  public categories$ = this._categoriesService.getCategories();

  constructor() {}
}
