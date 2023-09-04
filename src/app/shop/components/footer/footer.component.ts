import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {
  private _appService: AppService = inject(AppService);

  public currentYear = new Date().getFullYear();
  public businessName = this._appService.getBusinessName();
}
