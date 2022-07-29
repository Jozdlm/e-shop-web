import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import { CartDropdownComponent } from './cart-dropdown/cart-dropdown.component';


@NgModule({
  declarations: [
    NavbarComponent,
    CartDropdownComponent,
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavbarModule {
}
