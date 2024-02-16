import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {UsersInfoService} from "./users-info/users-info.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UsersInfoService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  add(user: User): void {
    this.userService
      .addUser(user)
      .subscribe(user => this.users.push(user));
  }

  update(newUser: User): void {
    this.userService
      .updateUser(newUser)
      .subscribe(user => {
        const ind = user ? this.users.findIndex(u => u.id === user.id) : -1;
        if (ind > -1) {
          this.users[ind] = newUser;
        }
      });
  }

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService
      .deleteUser(user.id)
      .subscribe();
  }
}
