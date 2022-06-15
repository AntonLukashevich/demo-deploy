import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../interfaces/user";
import {ThemeService} from "../../../../shared/services/settings/theme.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../shared/services/notification.service";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});
  public submitted = false;
  public theme: string | undefined;

  constructor( private themeService: ThemeService,
               public authService: AuthService,
               private router: Router,
               private notification: NotificationService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.themeService.getCurrentTheme().subscribe((theme) => this.theme = theme)
  }

  public submit(){
    if(this.loginForm.invalid){
      return;
    }
    this.submitted = true;

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    this.authService.login(user).subscribe(() => {
      this.loginForm.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.notification.showInfo('You are logged in', '')
      this.submitted = false;
    }, ( error)  => {
      this.notification.showError(this.authService.error$.value,'Oh, no!');
      this.submitted = false;
    })
  }
}
