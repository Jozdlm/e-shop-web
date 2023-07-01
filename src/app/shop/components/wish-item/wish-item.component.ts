import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWishItem } from '../../wish-list';

@Component({
  selector: 'app-wish-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wish-item.component.html'
})
export class WishItemComponent {
  @Input() public wishItem: IWishItem | undefined = undefined;
}
