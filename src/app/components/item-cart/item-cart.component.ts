import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImageDirective } from '@app/directives/product-image.directive';
import { ICartItem } from '@app/features/cart/cart.types';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  imports: [CommonModule, ProductImageDirective, SvgIconComponent],
})
export class ItemCartComponent {
  public item = input.required<ICartItem>({
    alias: 'cartItem',
  });

  public onDeleteItem = output<string>();
  public onIncreaseQty = output<string>();
  public onDecreaseQty = output<string>();

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
