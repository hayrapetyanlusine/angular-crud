import {Routes} from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {UsersComponent} from "./components/users/users.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";

export const routes: Routes = [
  {path: "", component: UsersComponent},
  {path: "create", component: CreateUserComponent},
  {path: "edit/:id", component: EditUserComponent},
  {path: '**', component: PageNotFoundComponent},
];
