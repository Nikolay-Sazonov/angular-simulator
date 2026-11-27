import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[boldHover]',
})
export class BoldHoverDirective {
  constructor() {}
  @HostBinding('style.font-weight') fontWeight: string = 'normal';

  @HostListener ('mouseenter') onMouseEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener ('mouseleave') onMouseLeave() {
    this.fontWeight = 'normal';
  }
}
