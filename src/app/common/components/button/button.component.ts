import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="py-2.5 px-4 rounded bg-green-700 text-white hover:bg-green-800"
    >
      <span class="text-sm font-semibold">
        <ng-content></ng-content>
      </span>
    </button>
  `,
})
export class ButtonComponent {
  public outlineClass = 'border border-gray-300 hover:bg-green-500/10 hover:border-green-800 text-green-800'
}
