import { Component } from '@angular/core';

import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-empty-cart',
    imports: [RouterModule, ButtonComponent],
    templateUrl: './empty-cart.component.html'
})
export class EmptyCartComponent {}
