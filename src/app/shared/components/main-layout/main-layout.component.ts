import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {FormControl} from "@angular/forms";
import {ThemeService} from "../../services/settings/theme.service";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1300)),
    ]),
  ]
})
export class MainLayoutComponent implements OnInit {
  // @ts-ignore
  @ViewChild('drawer') sidenav: MatSidenav;
  public theme: string = 'light';
  mode = new FormControl('over');
  public toggle = false;
  public animationState = false;
  private localStorageLyricsList = 'lyricsList';
  public max = 0;
  public showRandom = false;
  private touchTime = 0;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe((theme) => {
      this.theme = theme;
    });
  }

  public closeSidebar() {
    // @ts-ignore
    this.toggle = false;
    this.sidenav.close().then(r => {});
  }

  public setToggle(){
    this.toggle = !this.toggle;
  }

  public animate() {
    this.animationState = !this.animationState;
  }

  public getRandomInt() {
    console.log('click')
    if (this.touchTime == 0) {
      // set first click
      this.touchTime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - this.touchTime) < 800) {
        // double click occurred
        let range = JSON.parse(<string>localStorage.getItem(this.localStorageLyricsList)).length + 1;
        let rand = 1 + Math.random() * range;
        this.max = Math.floor(rand);
        this.showRandom = true;
        setTimeout( () => {
          this.showRandom = false;
          this.touchTime = 0;
        }, 1500)
      } else {
        // not a double click so set as a new first click
        this.touchTime = new Date().getTime();
      }
    }
  }
}
