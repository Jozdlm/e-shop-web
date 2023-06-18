import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <!-- Dropdown Toggle -->
      <button class="rounded py-2.5 px-4" (click)="toggleDropdown()">
        <ng-content select="#toggle-content"></ng-content>
      </button>
      <div
        class="bg-white rounded p-4 right-0 border border-neutral-300 drop-shadow-lg top-11 w-80"
        [ngClass]="{ absolute: showDropdown, hidden: !showDropdown }"
      >
        <!-- Contenido del Dropdown -->
        <ng-content select="#dropdown-content"></ng-content>
      </div>
    </div>
  `,
  styles: [],
})
export class DropdownComponent {
  private _elementRef = inject(ElementRef);

  public showDropdown: boolean = false;

  constructor() {}

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  public clickedOut(event: MouseEvent) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
