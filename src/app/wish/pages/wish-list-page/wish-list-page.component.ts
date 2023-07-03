import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListService } from '../../services/wish-list.service';
import { WishItemComponent } from '../../components/wish-item/wish-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, WishItemComponent],
  templateUrl: './wish-list-page.component.html',
})
export class WishListPageComponent {
  private _wishService: WishListService = inject(WishListService);

  public wishList = this._wishService.wishList;

  public clearWishList(): void {
    this._wishService.clearWishList();
  }
}
