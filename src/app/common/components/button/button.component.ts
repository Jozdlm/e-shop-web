import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    imports: [CommonModule],
    template: `
    <button
      class="rounded bg-green-700 px-4 py-2.5 text-white hover:bg-green-800"
      [class.w-full]="fullWidth"
      [disabled]="disabled"
      [ngClass]="{
        'cursor-not-allowed bg-gray-500 hover:bg-gray-500': disabled
      }"
    >
      <span class="text-sm font-semibold">
        <ng-content></ng-content>
      </span>
    </button>
  `
})
export class ButtonComponent {
  @Input() public fullWidth = false;
  @Input() public disabled = false;

  public outlineClass =
    'border border-gray-300 hover:bg-green-500/10 hover:border-green-800 text-green-800';
}
