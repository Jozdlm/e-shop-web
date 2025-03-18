import { Directive, inject, ElementRef, input, effect } from '@angular/core';

@Directive({
  selector: '[productImage]',
  standalone: true,
})
export class ProductImageDirective {
  private _elementRef = inject(ElementRef);
  public imageUrl = input<string | undefined>(undefined, {
    alias: 'productImage',
  });

  public productImage = effect(() => {
    if (this.imageUrl()) {
      this._elementRef.nativeElement.src = this.imageUrl();
    } else {
      this._elementRef.nativeElement.src = 'assets/images/no-product-img.jpg';
    }
  });
}
