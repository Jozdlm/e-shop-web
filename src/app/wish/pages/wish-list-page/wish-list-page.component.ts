import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListService } from '../../services/wish-list.service';
import { WishItemComponent } from '../../components/wish-item/wish-item.component';
import { EmptyWishComponent } from '../../components/empty-wish/empty-wish.component';

@Component({
  standalone: true,
  imports: [CommonModule, WishItemComponent, EmptyWishComponent],
  templateUrl: './wish-list-page.component.html',
})
export class WishListPageComponent {
  private _wishService: WishListService = inject(WishListService);

  public wishList = this._wishService.wishList;

  public clearWishList(): void {
    this._wishService.clearWishList();
  }
}
