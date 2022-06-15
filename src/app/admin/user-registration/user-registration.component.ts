import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {NotificationService} from "../../shared/services/notification.service";
import {ThemeService} from "../../shared/services/settings/theme.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public submitted = false;
  public theme: string | undefined;

  constructor(private usersService: UsersService,
              private router: Router,
              private notification: NotificationService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    });
    this.themeService.getCurrentTheme().subscribe((theme) => this.theme = theme);
  }

  public submit() {
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

  get email(){ return this.form.get('email');}
  get password(){ return this.form.get('password');}
  get username(){ return this.form.get('username');}
}
