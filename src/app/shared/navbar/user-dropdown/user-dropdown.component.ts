import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent],
  templateUrl: './user-dropdown.component.html',
  styles: [],
})
export class UserDropdownComponent {
  public menuItems: MenuItem[] = [
    {link: 'my-account', placeholder: 'Configuración cuenta'},
    {link: 'my-orders', placeholder: 'Mis pedidos'},
    {link: 'purchase-history', placeholder: 'Historial de compras'},
  ];
}

interface MenuItem {
  link: string;
  placeholder: string;
}