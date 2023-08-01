import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { IProduct } from 'src/app/store/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductImageDirective],
})
export class ProductCardComponent {
  @Input() public product!: IProduct;
}
