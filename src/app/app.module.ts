import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FocusDirective} from "./directives/focus.directive";
import {HomeComponent} from './shared/components/home/home.component';
import {SearchFilterPipe} from "./pipes/search-filter.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LyricsPageComponent} from './shared/components/lyrics-page/lyrics-page.component';
import {SettingsComponent} from './shared/components/settings/settings.component';
import {SharedModule} from "./shared/shared.module";
import {AuthGuard} from "./admin/shared/services/auth.guard";

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        FocusDirective,
        HomeComponent,
        //SearchFilterPipe,
        LyricsPageComponent,
        SettingsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    providers: [AuthGuard],
    exports: [
      //SearchFilterPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
