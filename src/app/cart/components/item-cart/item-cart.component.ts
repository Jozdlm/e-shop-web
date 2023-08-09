import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from 'src/app/cart/services/shopping-cart.service';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { ICartItem } from 'src/app/cart/cart';

@Component({
  selector: 'app-item-cart',
  standalone: true,
  imports: [CommonModule, ProductImageDirective],
  templateUrl: './item-cart.component.html',
})
export class ItemCartComponent {
  private _cartService: ShoppingCartService = inject(ShoppingCartService);

  @Input({ alias: 'cartItem', required: true })
  public item!: ICartItem;

  public increaseQty(itemId: string): void {
    this._cartService.increaseQuantity(itemId);
  }

  public decreaseQty(itemId: string): void {
    this._cartService.decreaseQuantity(itemId);
  }

  public removeItem(itemId: string): void {
    this._cartService.removeFromCart(itemId);
  }
}
