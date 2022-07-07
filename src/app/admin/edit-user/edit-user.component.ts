import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UsersService} from "../users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NotificationService} from "../../shared/services/notification/notification.service";
import {ThemeService} from "../../shared/services/settings/theme.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  public theme: string | undefined;
  // @ts-ignore
  private user: User;
  private userId: number | undefined;
  public idSub: Subscription | undefined;
  public userSub: Subscription | undefined;
  public editForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
  });

  constructor(private userService: UsersService,
              private router: ActivatedRoute,
              private route: Router,
              private notification: NotificationService,
              private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe((theme) => this.theme = theme);
    this.idSub = this.router.params.subscribe(params => this.userId = params['id']);
    this.userSub = this.userService.getUserById(this.userId).subscribe( (user) => {
      this.user = user;
      this.editForm.get('id')?.setValue(this.user.id);
      this.editForm.get('email')?.setValue(this.user.email);
      this.editForm.get('password')?.setValue(this.user.password);
      this.editForm.get('username')?.setValue(this.user.username);
    });
  }

  public updateUser(){
    this.userService.updateUser(this.editForm.value).subscribe( (res) => {
      this.notification.showSuccess(`user:${res.email}  has been updated`, 'Updated')
      this.route.navigate(['/admin', 'dashboard']);
    } );
  }

  ngOnDestroy(): void {
    if(this.idSub){
      this.idSub.unsubscribe();
    }
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
