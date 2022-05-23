import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {FormControl} from "@angular/forms";
import {ThemeService} from "../../services/settings/theme.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  // @ts-ignore
  @ViewChild('drawer') sidenav: MatSidenav;
  theme: string = 'light';
  mode = new FormControl('over');
  toggle = false;

  constructor(private themeService: ThemeService) {
    this.toggle = false;
  }

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe((theme) => {
      this.theme = theme;
    });
  }

  closeSidebar() {
    // @ts-ignore
    this.toggle = false;
    this.sidenav.close().then(r => {});
  }

  setToggle(){
    this.toggle = !this.toggle;
    console.log('toggle: ' + this.toggle);
  }

}
