import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchIconComponent } from 'src/app/shared/icons/search-icon/search-icon.component';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  styles: [],
  imports: [CommonModule, SearchIconComponent],
})
export class SearchInputComponent {}
