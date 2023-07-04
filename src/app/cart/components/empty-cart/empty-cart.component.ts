import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './empty-cart.component.html',
})
export class EmptyCartComponent {}
