import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductImageDirective } from '@app/directives/product-image.directive';
import { IProduct } from '@app/features/products/product.types';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    imports: [CommonModule, RouterModule, ProductImageDirective]
})
export class ProductCardComponent {
  public readonly product = input.required<IProduct>();
}
