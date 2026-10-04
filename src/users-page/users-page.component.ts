import { Component, OnInit } from '@angular/core';
import { UserService } from '../app/servis/user.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../app/user-card/user-card.component';
import { UserCreateComponent } from '../app/user-create/user-create.component';
import { User } from '../app/interfaces/User';
import { UsersFilterComponent } from '../app/users-filter/users-filter.component';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private searchSubject$ = new BehaviorSubject<string>('');
  filteredUsers$!: Observable<User[]>;

  isCreateModalOpen: boolean = false;

  constructor(public userService: UserService) {
    this.filteredUsers$ = combineLatest([
      this.userService.users$,
      this.searchSubject$
    ]).pipe(
      map(([users, query]) => {
        const q = query.trim().toLowerCase();
        if (!q) return users;
        return users.filter(u => u.name.toLowerCase().includes(q));
      })
    );
  }

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  };

  onDeleteUser(id:number):void {
    this.userService.deleteUser(id);
  };

  openCreateModal():void {
    this.isCreateModalOpen = true;
    document.body.classList.add('no-scroll');
  }

  closeCreateModal():void {
    this.isCreateModalOpen = false;
    document.body.classList.remove('no-scroll');
  }

  onUserCreated(user: User):void {
    this.userService.addUser(user);
    this.closeCreateModal();
  }
  
  onSearchChange(query: string): void {
    this.searchSubject$.next(query);
  }
}
