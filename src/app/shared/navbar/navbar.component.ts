import { Component, Input } from '@angular/core';
import { CartDropdownComponent } from './cart-dropdown/cart-dropdown.component';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  standalone: true,
  imports: [RouterLink, CartDropdownComponent, DropdownComponent],
})
export class NavbarComponent {
  @Input() businessName: string = '';

  constructor() {}
}
