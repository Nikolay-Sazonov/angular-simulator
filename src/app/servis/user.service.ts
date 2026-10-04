import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageManagementService } from './message-management.service';
import { MessageType } from '../../enums/MessagesType';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, catchError,  finalize, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApiService: UserApiService = inject (UserApiService);
  loaderService: LoaderService = inject (LoaderService);
  messageManagementService: MessageManagementService = inject (MessageManagementService);
  localStorageService: LocalStorageService = inject (LocalStorageService);


  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject$.asObservable();

  setUsers(users: User[]): void {
    this.usersSubject$.next(users);
    this.localStorageService.set('users', users);
  };


  loadUsers(): Observable<User[]> {
    const cached = this.localStorageService.get<User[]>('users')
    if( cached && cached.length > 0){
      this.setUsers(cached);
      return of (cached)
    }
    this.loaderService.showLoader();
    return this.userApiService.getUser().pipe(
      tap ((users) => this.setUsers(users)),
      catchError(( ) => {
        this.messageManagementService.addMessage('Ошибка загрузки пользователей', MessageType.Error);
        return of([]);
      }),

      finalize(() =>
        this.loaderService.hideLoader()
      )
    )
  }

  deleteUser(id:number): void {
    const currentUser = this.usersSubject$.getValue();
    const updatedUsers = currentUser.filter( user => user.id !== id);
    this.setUsers(updatedUsers);
  }

  addUser(user: User): void {
    const currentUsers = this.usersSubject$.getValue();
    const updatedUsers = [user, ...currentUsers];
    this.setUsers(updatedUsers);
  }
}
