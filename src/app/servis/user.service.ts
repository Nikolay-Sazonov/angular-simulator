import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageManagementService } from './message-management.service';
import { MessageType } from '../../enums/MessagesType';
import { BehaviorSubject, catchError, finalize, Observable, of, subscribeOn, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApiService: UserApiService = inject (UserApiService);
  loaderService: LoaderService = inject (LoaderService);
  messageManagementService: MessageManagementService = inject (MessageManagementService);


  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject$.asObservable();

  setUsers(users: User[]): void {
    this.usersSubject$.next(users);
  };

  getUsers(): Observable<User[]> {
    return this.usersSubject$.asObservable();
  }

  loadUsers(): Observable<User[]> {
    this.loaderService.showLoader();
    return this.userApiService.getUser().pipe(
      tap ((users) => this.setUsers(users)),
        catchError((err ) => {
          this.messageManagementService.addMessage('Ошибка загрузки пользователей', MessageType.Error);
          return of([]);
        }),

        finalize(() =>
          this.loaderService.hideLoader()
        )
      )
    
  }
}
