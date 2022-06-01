import {Injectable, NgModule} from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FocusDirective} from "./directives/focus.directive";
import {HomeComponent} from './shared/components/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LyricsPageComponent} from './shared/components/lyrics-page/lyrics-page.component';
import {SettingsComponent} from './shared/components/settings/settings.component';
import {SharedModule} from "./shared/shared.module";
import {AuthGuard} from "./admin/shared/services/auth.guard";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LyricInfoComponent} from "./shared/components/lyrics-info/lyric-info.component";
import {ToastrModule} from "ngx-toastr";
import {ThemeDirective} from "./directives/theme.directive";

// @ts-ignore
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";


@Injectable()
export class LyricsHammerConfig extends HammerGestureConfig{
  override = <any>{
    'swipe': {direction: Hammer.DIRECTION_HORIZONTAL}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    FocusDirective,
    ThemeDirective,
    HomeComponent,
    LyricsPageComponent,
    SettingsComponent,
    LyricInfoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ToastrModule.forRoot(),
    HammerModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: LyricsHammerConfig
    }
  ],

  exports: [
    FocusDirective,
    ThemeDirective
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
