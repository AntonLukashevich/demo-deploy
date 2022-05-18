import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatSliderModule} from "@angular/material/slider";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {SearchFilterPipe} from "../pipes/search-filter.pipe";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    SearchFilterPipe
  ],
  imports: [
    HttpClientModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [
    SearchFilterPipe,
    HttpClientModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
  ]
})
export class SharedModule {}
