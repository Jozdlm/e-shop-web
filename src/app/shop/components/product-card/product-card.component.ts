import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { IProduct } from 'src/app/shop/product';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    imports: [CommonModule, RouterModule, ProductImageDirective]
})
export class ProductCardComponent {
  public readonly product = input.required<IProduct>();
}
