import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
  selector: '[userPhoto]',
  standalone: true
})
export class UserPhotoDirective {
  private _elementRef: ElementRef = inject(ElementRef);

  @Input()
  public set userPhoto(imgUrl: string | undefined | null) {
    if (imgUrl && imgUrl.trim().length > 1) {
      this._elementRef.nativeElement.src = imgUrl;
    } else {
      this._elementRef.nativeElement.src = 'assets/images/no-user-img.png';
    }
  }

  constructor() {}

}
