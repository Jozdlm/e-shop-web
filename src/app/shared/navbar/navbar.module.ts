import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import { CartDropdownComponent } from './cart-dropdown/cart-dropdown.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    NavbarComponent,
    CartDropdownComponent,
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavbarModule {
}
