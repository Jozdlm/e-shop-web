import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICartItem } from '../../interfaces/cart-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-item-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css'],
})
export class ItemCartComponent {
  private _cartService = inject(ShoppingCartService);

  @Input({ alias: 'cartItem', required: true })
  public item!: ICartItem;

  public removeItem(productId: number): void {
    this._cartService.removeFromCart(productId);
  }
}
