import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  public session: boolean = false;

  @Output()
  public onNoSessionClick = new EventEmitter<boolean>(false);

  public handleNoSessionClick(): void {
    this.onNoSessionClick.emit(true);
  }
}
