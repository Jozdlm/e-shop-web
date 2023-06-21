import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { IMenuItem } from 'src/app/common/interfaces/menu-item';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent],
  templateUrl: './user-dropdown.component.html',
  styles: [],
})
export class UserDropdownComponent {
  public menuItems: IMenuItem[] = [
    {link: 'my-account', placeholder: 'Configuración cuenta'},
    {link: 'my-orders', placeholder: 'Mis pedidos'},
    {link: 'purchase-history', placeholder: 'Historial de compras'},
  ];
}