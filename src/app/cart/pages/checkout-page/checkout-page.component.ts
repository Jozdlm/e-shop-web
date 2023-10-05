import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-page.component.html',
  styles: [`
    .wrapper{
      display: grid;
      grid-template-columns: 1fr 394px;
    }
  `]
})
export class CheckoutPageComponent {

}
