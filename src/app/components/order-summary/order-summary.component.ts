import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-order-summary',
  imports: [CommonModule, RouterModule, SvgIconComponent],
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  public readonly subtotal = input.required<number>();
  public readonly session = input.required<boolean>();
  public readonly onNoSessionClick = output<boolean>();

  public handleNoSessionClick(): void {
    this.onNoSessionClick.emit(true);
  }
}
