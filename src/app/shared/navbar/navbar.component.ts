import {Component, Input, OnInit} from '@angular/core';
import { CartDropdownComponent } from './cart-dropdown/cart-dropdown.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [RouterLink, CartDropdownComponent]
})
export class NavbarComponent implements OnInit {
  @Input() businessName: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
