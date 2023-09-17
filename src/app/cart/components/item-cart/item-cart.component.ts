import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { ICartItem } from 'src/app/cart/cart';

@Component({
  selector: 'app-item-cart',
  standalone: true,
  imports: [CommonModule, ProductImageDirective],
  templateUrl: './item-cart.component.html',
})
export class ItemCartComponent {
  @Input({
    alias: 'cartItem',
    required: true,
  })
  public item!: ICartItem;

  @Output()
  public onDeleteItem = new EventEmitter<string>();
  @Output()
  public onIncreaseQty = new EventEmitter<string>();
  @Output()
  public onDecreaseQty = new EventEmitter<string>();

  public increaseQty(itemId: string): void {
    this.onIncreaseQty.emit(itemId);
  }

  public decreaseQty(itemId: string): void {
    this.onDecreaseQty.emit(itemId);
  }

  public removeItem(itemId: string): void {
    this.onDeleteItem.emit(itemId);
  }
}
