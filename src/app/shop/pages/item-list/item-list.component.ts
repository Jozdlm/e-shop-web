import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styles: [
  ]
})
export class ItemListComponent {
  @Input()
  public set category(category_slug: string) {
    console.log(category_slug);
  }
}
