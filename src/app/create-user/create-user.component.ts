import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  createUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z]*$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      company: this.formBuilder.group({
        name: ['']
      })
    });
  }

  resetValues(): void {
    this.createUserForm.patchValue({
      name: "", email: "",
      company: {
        name: ""
      }
    });
  }

  onSubmit(): void {
    const formData = this.createUserForm.value;

    this.router.navigate([""], {state: {data: formData}});
  }

  getNameErrorMessage() {
    const nameFormControl = this.createUserForm.get('name');

    if (nameFormControl?.hasError("required")) {
      return "Name is required";
    }

    if (nameFormControl?.hasError("minlength")) {
      return "Name must be at least 3 characters";
    }

    return nameFormControl?.hasError("pattern") ? "Only string" : "";
  }

  getEmailErrorMessage() {
    const emailFormControl = this.createUserForm.get("email");

    if (emailFormControl?.hasError("required")) {
      return "Email is required";
    }

    return emailFormControl?.hasError("email") ? "Not a valid email" : "";
  }
}
