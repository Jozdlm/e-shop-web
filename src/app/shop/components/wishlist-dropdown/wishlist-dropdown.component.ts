import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { WishListService } from 'src/app/wish/services/wish-list.service';
import { IWishList } from 'src/app/wish/wish-list';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlist-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    DropdownComponent,
    ProductImageDirective,
    ButtonComponent,
    RouterModule
  ],
  templateUrl: './wishlist-dropdown.component.html',
})
export class WishlistDropdownComponent {
  private _wishService: WishListService = inject(WishListService);

  public wishList: Signal<IWishList> = this._wishService.wishList;
}
