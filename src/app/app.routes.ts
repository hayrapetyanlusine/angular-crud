import {Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UsersComponent} from "./users/users.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

export const routes: Routes = [
  {path: "", component: UsersComponent},
  {path: "create", component: CreateUserComponent},
  {path: "edit/:id", component: EditUserComponent},
  {path: '**', component: PageNotFoundComponent},
];
