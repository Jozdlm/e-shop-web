import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWishItem } from '../../../wish/wish-list';
import { ProductImageDirective } from '../../../common/directives/product-image.directive';
import { WishListService } from '../../../wish/services/wish-list.service';

@Component({
  selector: 'app-wish-cart',
  standalone: true,
  imports: [CommonModule, ProductImageDirective],
  templateUrl: './wish-cart.component.html',
})
export class WishCartComponent {
  private _wishService: WishListService = inject(WishListService);

  @Input() wishItem!: IWishItem;

  public moveToCart(item: IWishItem): void {
    this._wishService.moveToCart(item);
  }
}
