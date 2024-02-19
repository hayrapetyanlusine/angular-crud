import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UsersInfoService} from "../users/users-info/users-info.service";
import {User} from "../users/user";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersInfoService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idString: string | null = params.get("id");

      if (idString !== null) {
        this.selectedId = parseInt(idString, 10);
        this.getUser(this.selectedId);
      }
    });
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
