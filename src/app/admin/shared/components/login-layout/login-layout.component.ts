import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../interfaces/user";
import {ThemeService} from "../../../../shared/services/settings/theme.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  theme: string | undefined;
  constructor( private themeService: ThemeService,
               public authService: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.themeService.getCurrentTheme().subscribe((theme) => this.theme = theme)
  }

  submit(){
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
      this.submitted = false;
    }, ()  => {
      this.submitted = false;
    })

  }

}
