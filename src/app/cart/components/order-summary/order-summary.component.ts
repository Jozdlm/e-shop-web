import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'src/app/common/components/button/button.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  @Input({ required: true })
  public subtotal: number = 0;

  @Input({ required: true })
  public tax: number = 0;

  @Input({ required: true })
  public session: boolean = false;

  public get total(): number {
    return this.subtotal + this.tax;
  }
}
