import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImageDirective } from '@app/directives/product-image.directive';
import { ICartItem } from '@app/features/cart/cart.types';
import { MinusIconComponent } from 'src/app/shared/icons/minus-icon/minus-icon.component';
import { PlusIconComponent } from 'src/app/shared/icons/plus-icon/plus-icon.component';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  imports: [
    CommonModule,
    ProductImageDirective,
    MinusIconComponent,
    PlusIconComponent,
  ],
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
