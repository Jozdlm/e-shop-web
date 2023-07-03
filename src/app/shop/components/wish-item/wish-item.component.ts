import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWishItem } from '../../wish-list';
import { ProductImageDirective } from '../../../common/directives/product-image.directive';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../common/components/button/button.component';
import {WishListService} from "../../services/wish-list.service";

@Component({
  selector: 'app-wish-item',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductImageDirective, ButtonComponent],
  templateUrl: './wish-item.component.html',
})
export class WishItemComponent {
  private _wishService: WishListService = inject(WishListService);

  @Input() public wishItem: IWishItem | undefined = undefined;

  public removeFromWish(itemId: string): void {
    this._wishService.removeFromWish(itemId);
  }
}
