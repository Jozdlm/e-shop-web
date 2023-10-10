import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="mb-6 flex max-w-max items-center gap-x-1 rounded-full px-2 py-1"
      [ngClass]="{
        'border border-gray-300': (chipType == 'default'),
        'text-green-900 bg-green-200': (chipType == 'success')
      }"
    >
      <p class="text-xs font-medium">{{ label }}</p>
    </div>
  `,
  styles: [],
})
export class ChipComponent {
  public chipType: string = 'default';

  @Input()
  public label: string = 'label';

  @Input()
  public set type(type: string) {
    switch (type) {
      case 'success':
        this.chipType = 'success';
        break;

      default:
        this.chipType = 'default';
        break;
    }
  }
}
