import { Component } from '@angular/core';
import { NgTemplateOutlet, AsyncPipe} from '@angular/common';
import { MessageManagementService } from '../app/servis/message-management.service';

@Component({
selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessegeComponent {
constructor(public messageManagementService: MessageManagementService ){}
}
