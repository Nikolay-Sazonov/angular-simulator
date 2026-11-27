import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';
import { GreadientConfig } from './interfaces/greadient-config';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Directive({
  selector: '[appAnimatedGradient]',
})
export class AnimatedGradientDirective implements OnDestroy {
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  private config: GreadientConfig = {
    delay : 1000,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    thickness: '2px'
  }

  @Input()
  set GradientConfiguration(val: GreadientConfig | undefined) {
    if (val) {
      this.config = {...this.config, ...val};
    }
  }

  private timeoutId: any = null;
  private isGradientActive = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.timeoutId = setTimeout(() => {
      this.applyGradient();
    }, this.config.delay);
  }

  @HostListener('mouseleave')onMouseLeave() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.isGradientActive) {
      this.removeGradient();
    }
  }

  private applyGradient() {
    const gradient = `linear-gradient(90deg, ${this.config.colors?.join(', ')})`;
    this.renderer.setStyle(this.el.nativeElement, 'border', `${this.config.thickness} solid transparent`);
    this.renderer.setStyle(this.el.nativeElement, 'background-image', gradient);
    this.renderer.setStyle(this.el.nativeElement, 'background-origin', 'border-box');
    this.renderer.setStyle(this.el.nativeElement, 'background-size', '200% 200%'); // Для анимации
    this.renderer.setStyle(this.el.nativeElement, 'animation', 'gradientMove 2s linear infinite');
    this.isGradientActive = true;
  }

  private removeGradient() {
    this.renderer.removeStyle(this.el.nativeElement, 'border');
    this.renderer.removeStyle(this.el.nativeElement, 'background-image');
    this.renderer.removeStyle(this.el.nativeElement, 'background-origin');
    this.renderer.removeStyle(this.el.nativeElement, 'background-size');
    this.renderer.removeStyle(this.el.nativeElement, 'animation');
    
    this.isGradientActive = false;
  }

  ngOnDestroy() {
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
  }
}
}
