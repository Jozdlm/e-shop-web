import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductImageDirective } from '@app/directives/product-image.directive';
import { IProduct } from '@app/types/product.types';
import { Pages } from '@app/pages';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule, ProductImageDirective],
  template: `
    <div class="overflow-hidden">
      <img
        class="cursor-pointer object-contain w-full h-[180px]"
        [productImage]="product().img_url"
        title="Product Image"
        [alt]="product().name"
        [routerLink]="productUrl"
      />
      <div class="p-4">
        <p class="line-clamp-3 mb-2">{{ product().name | titlecase }}</p>
        <p class="text-lg font-medium">
          {{ product().selling_price | currency: 'GTQ' }}
        </p>
      </div>
    </div>
  `,
})
export class ProductCardComponent implements OnInit {
  public readonly product = input.required<IProduct>();
  public productUrl: [string, number] = ['', 0];

  public ngOnInit(): void {
    this.productUrl = [`/${Pages.PRODUCT_DETAIL}`, this.product().id];
  }
}
