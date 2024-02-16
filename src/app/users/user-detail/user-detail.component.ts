import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersInfoService} from "../users-info/users-info.service";
import {Observable} from "rxjs";
import {User} from "../user";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{
  user !: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersInfoService
  ) {}

  ngOnInit() {
  }
}
