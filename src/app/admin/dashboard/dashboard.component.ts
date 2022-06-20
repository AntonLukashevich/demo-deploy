import {Component, OnInit,} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../shared/services/settings/theme.service";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public theme: string | undefined;
  constructor(private auth: AuthService,
              private router: Router,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe( theme => this.theme = theme);
  }
}
