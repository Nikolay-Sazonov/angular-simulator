import { Injectable } from '@angular/core';
import { Message } from '../interfaces/MessageCard';
import { MessageType } from '../../enums/MessagesType';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  
  private messagesSubject$ = new BehaviorSubject< Message[]>([]);
  messages$: Observable<Message[]> = this.messagesSubject$.asObservable();

  addMessage(text: string, type: MessageType): void {
    const id = Date.now ();
    const newMessage: Message = {
      id: id,
      text: text,
      type: type
    }
    const currentMessages = this.messagesSubject$.getValue();
    const unshiftMessage = [newMessage, ...currentMessages];
    this.messagesSubject$.next(unshiftMessage);

    if (currentMessages.length > 0) {
      setTimeout(() =>{
        this.closeMessage(id)
      },5000) 
    }
}

  closeMessage(id: number):void {
    const currentMessages = this.messagesSubject$.getValue();
    const newArray = currentMessages.filter(message => message.id !== id);
    this.messagesSubject$.next(newArray);
  }

  tourProgramBtnClick() {
    this.addMessage('Программа недоступна',MessageType.Warn)
   }
 
  outCostBtnClick() {
    this.addMessage('Стоимость отправлена на почту', MessageType.Info);
  }
 
  destinationRatingBtnClick(){
    this.addMessage('Направления получены',MessageType.Success);
  }
 
  materialsBtnClick(){
    this.addMessage('Материалы недоступны',MessageType.Error);
  }

  
}
