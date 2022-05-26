import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomeComponent} from "./shared/components/home/home.component";
import {LyricsPageComponent} from "./shared/components/lyrics-page/lyrics-page.component";
import {SettingsComponent} from "./shared/components/settings/settings.component";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomeComponent},
      {path: 'lyrics/:id', component: LyricsPageComponent},
      {path: 'settings', component: SettingsComponent},
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
