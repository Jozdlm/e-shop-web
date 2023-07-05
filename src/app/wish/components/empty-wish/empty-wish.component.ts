import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'src/app/common/components/button/button.component';

@Component({
  selector: 'app-empty-wish',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './empty-wish.component.html',
})
export class EmptyWishComponent {}
