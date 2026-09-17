import { Component, OnInit } from '@angular/core';
import { UserService } from '../app/servis/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }
}
