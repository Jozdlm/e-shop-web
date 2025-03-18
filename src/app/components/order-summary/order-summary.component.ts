import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@app/components/button/button.component';
import { LockClosedIconComponent } from 'src/app/shared/icons/lock-closed-icon/lock-closed-icon.component';
import { ClipboardDocIconComponent } from 'src/app/shared/icons/clipboard-doc-icon/clipboard-doc-icon.component';

@Component({
  selector: 'app-order-summary',
  imports: [
    CommonModule,
    RouterModule,
    LockClosedIconComponent,
    ClipboardDocIconComponent,
  ],
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
