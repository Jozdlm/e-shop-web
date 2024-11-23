import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { LockClosedIconComponent } from 'src/app/shared/icons/lock-closed-icon/lock-closed-icon.component';
import { ClipboardDocIconComponent } from 'src/app/shared/icons/clipboard-doc-icon/clipboard-doc-icon.component';

@Component({
    selector: 'app-order-summary',
    imports: [
        CommonModule,
        RouterModule,
        ButtonComponent,
        LockClosedIconComponent,
        ClipboardDocIconComponent
    ],
    templateUrl: './order-summary.component.html'
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
