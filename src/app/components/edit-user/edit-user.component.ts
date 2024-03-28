import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersInfoService} from "../../services/users-info.service";
import {User} from "../../interfaces/user";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  userService: UsersInfoService = inject(UsersInfoService);
  formBuilder: FormBuilder = inject(FormBuilder);

  user!: User;
  selectedId!: number;
  isLoading: boolean = false;

  editUserForm = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["this.user.email", Validators.required],
    company: this.formBuilder.group({
      name: [""]
    })
  });

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get("id"));

    this.getUser(id);
  }

  getUser(id: number): void {
    this.isLoading = true;

    this.userService.getUser(id)
      .subscribe((selectedUser: User) => {
        this.user = selectedUser;
        this.isLoading = false;

        this.editUserForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          company: {
            name: this.user.company.name
          }
        });
      });
  }

  onEdit(): void {
    const formNewData = this.editUserForm.value;

    this.router.navigate([""], {
      state: { data: formNewData, id: this.selectedId, isEditing: true }
    });
  }
}
