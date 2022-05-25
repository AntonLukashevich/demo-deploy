import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private usersService: UsersService,
              private router: Router,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
  }

  submit() {
    if(this.form.invalid){
      return;
    }
    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      username: this.form.value.username,
    }

    this.usersService.sign_up(user).subscribe((res:any) => {
        console.log(res);
        this.form.reset();
        this.notification.showSuccess('user has been added', 'Added')
        this.router.navigate(['admin' + '/dashboard']);
        this.submitted = false;
      },
      (error) => {
        console.log(error);
      });
  }

}
