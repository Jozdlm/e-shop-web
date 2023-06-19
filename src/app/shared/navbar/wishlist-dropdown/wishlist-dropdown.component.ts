import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';

@Component({
  selector: 'app-wishlist-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: './wishlist-dropdown.component.html',
  styles: [],
})
export class WishlistDropdownComponent {}
