import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MessageManagementService } from '../app/servis/message-management.service';

@Component({
selector: 'app-message',
  imports: [NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessegeComponent {
constructor(public MessageManagementService: MessageManagementService ){}
}
