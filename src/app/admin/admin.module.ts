import {NgModule} from "@angular/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './shared/components/login-layout/login-layout.component';
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./shared/services/auth.guard";
import { CreateLyricsTextComponent } from './editor/create-lyrics-text/create-lyrics-text.component';
import { CreateLyricsChordsComponent } from './editor/create-lyrics-chords/create-lyrics-chords.component';
import {EditorService} from "./editor.service";
import { EditLyricsComponent } from './edit-lyrics/edit-lyrics.component';
import {UsersService} from "./users.service";
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminLayoutComponent,
    LoginLayoutComponent,
    CreateLyricsTextComponent,
    CreateLyricsChordsComponent,
    EditLyricsComponent,
    UserRegistrationComponent,
    EditUserComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
          {path: 'login', component: LoginLayoutComponent},
          {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
          {path: 'lyrics/create_text', component: CreateLyricsTextComponent},
          {path: 'lyrics/create_chords', component: CreateLyricsChordsComponent},
          {path: 'lyrics/:id/edit', component: EditLyricsComponent},
          {path: 'users/new', component: UserRegistrationComponent},
          {path: 'users/:id/edit', component: EditUserComponent}
        ]
      }
    ]),
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    EditorService,
    UsersService
  ]
})

export class AdminModule {}
