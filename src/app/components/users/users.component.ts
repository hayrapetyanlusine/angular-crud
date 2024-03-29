import {Component, inject, OnInit} from '@angular/core';
import {UsersInfoService} from "../../services/users-info.service";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SearchComponent} from "../search.component";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    SearchComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  userService: UsersInfoService = inject(UsersInfoService);

  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getUsers();

    const formData = history.state.data;

    if(formData) {
      const {name, email, company} = formData;

      const data: User = {
        id: history.state.id ? history.state.id : this.users.length + 1,
        name, email,
        company: {
          name: company.name || ""
        }
      }

      history.state.isEditing ? this.update(data) : this.add(data);
    }
  }

  getUsers(): void {
    this.isLoading = true;

    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
        this.filteredUsers = users;
        this.isLoading = false;
      });
  }

  add(user: User): void {
    this.userService
      .addUser(user)
      .subscribe((user: User) => this.users.push(user));
  }

  update(newUser: User): void {
    this.userService
      .updateUser(newUser)
      .subscribe((user: User) => {
        const ind = user ? this.users.findIndex(u => u.id === user.id) : -1;
        if (ind > -1) {
          this.users[ind] = newUser;
        }
      });
  }

  delete(user: User): void {
    const index: number = this.users.indexOf(user);

    if (index !== -1) {
      this.users.splice(index, 1);
      this.filteredUsers = this.filteredUsers.filter(u => u !== user);
    }

    this.userService
      .deleteUser(user.id)
      .subscribe();
  }

  onSearchTextChanged(searchText: string): void {
    searchText = searchText.trim().toLowerCase();

    this.filteredUsers = this.users.filter((user: User) =>
      user.name.toLowerCase().includes(searchText)
    );
  }
}
