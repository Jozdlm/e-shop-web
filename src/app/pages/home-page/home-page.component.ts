import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/shop/services/products.service';
import { ProductCardComponent } from 'src/app/shop/components/product-card/product-card.component';
import { SearchInputComponent } from '@app/shop/components/search-input/search-input.component';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '@app/shop/services/categories.service';

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
  private _categoriesService: CategoriesService = inject(CategoriesService);
  public products = this._productsService.getStarredProducts();
  public categories$ = this._categoriesService.getCategories();

  constructor() {}
}
