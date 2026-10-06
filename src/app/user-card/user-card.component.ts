import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../interfaces/User';


@Component({
  selector: 'app-user-card',
  imports: [],
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
