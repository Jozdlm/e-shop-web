import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWishItem } from '../../wish-list';
import { ProductImageDirective } from '../../../common/directives/product-image.directive';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../common/components/button/button.component';

@Component({
  selector: 'app-wish-item',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductImageDirective, ButtonComponent],
  templateUrl: './wish-item.component.html',
})
export class WishItemComponent {
  @Input() public wishItem: IWishItem | undefined = undefined;
}
