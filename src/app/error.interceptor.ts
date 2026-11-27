import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageManagementService } from './servis/message-management.service';
import { catchError, throwError } from 'rxjs';
import { MessageType } from '../enums/MessagesType';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const messageService = inject(MessageManagementService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status >= 500 || error.status === 0) {
        const errorMessage = error.status === 0 ? 'Нет соединения с сервером. Проверьте интернет.' : `Ошибка сервера (${error.status}). Попробуйте позже.`;
        messageService.addMessage(errorMessage, MessageType.Error);
      }
      return throwError (() => error);
    })
  );
};
