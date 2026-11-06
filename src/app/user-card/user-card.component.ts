import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../interfaces/User';
import { UpperCasePipe } from '@angular/common';
import { PhoneFormatPipe } from '../phone-format.pipe';
import { BoldHoverDirective } from '../bold-hover.directive';
import { AnimatedGradientDirective } from '../animated-gradient.directive';


@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneFormatPipe, BoldHoverDirective, AnimatedGradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({required: true}) user!: User;
  @Output() delete = new EventEmitter<number>();

  onDelete():void {
    this.delete.emit(this.user.id);
  }
}
