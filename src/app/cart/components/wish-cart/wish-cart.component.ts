import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWishItem } from '../../../wish/wish-list';
import { ProductImageDirective } from '../../../common/directives/product-image.directive';

@Component({
  selector: 'app-wish-cart',
  standalone: true,
  imports: [CommonModule, ProductImageDirective],
  templateUrl: './wish-cart.component.html',
})
export class WishCartComponent {
  @Input() wishItem!: IWishItem;
}
