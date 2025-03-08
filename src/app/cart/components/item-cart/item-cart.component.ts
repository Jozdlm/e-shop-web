import { Component, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { ICartItem } from 'src/app/cart/cart';
import { MinusIconComponent } from 'src/app/shared/icons/minus-icon/minus-icon.component';
import { PlusIconComponent } from 'src/app/shared/icons/plus-icon/plus-icon.component';

@Component({
    selector: 'app-item-cart',
    templateUrl: './item-cart.component.html',
    imports: [CommonModule, ProductImageDirective, MinusIconComponent, PlusIconComponent]
})
export class ItemCartComponent {
  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input({
    alias: 'cartItem',
    required: true,
  })
  public item!: ICartItem;

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
