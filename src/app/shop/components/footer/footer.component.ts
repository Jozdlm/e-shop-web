import { Component, inject } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [RouterModule],
    templateUrl: './footer.component.html',
    styles: []
})
export class FooterComponent {
  private _appService: AppService = inject(AppService);

  public currentYear = new Date().getFullYear();
  public businessName = this._appService.getBusinessName();
}
