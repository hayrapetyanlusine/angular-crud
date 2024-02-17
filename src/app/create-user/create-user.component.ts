import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  createUserForm = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    company: this.formBuilder.group({
      name: [""]
    })
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  resetValues() {
    this.createUserForm.patchValue({
      name: "",
      email: "",
      company: {
        name: ""
      }
    });
  }

  onSubmit(): void {
    const formData = this.createUserForm.value;
    this.router.navigate([""], { state: { data: formData } });
  }
}
