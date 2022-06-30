import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Component({
  selector: 'app-settings-panel',
  templateUrl: 'settings-panel.component.html',
  styleUrls: ['settings-panel.component.scss', './../dashboard.component.scss']
})
export class SettingsPanelComponent implements OnInit{
  public endSession: Date | undefined;
  constructor(private auth: AuthService,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.getAuthTokenExp();
  }

  public logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.notification.showInfo('session has been finished', 'Logout')
    this.router.navigate(['admin' + '/login']);
  }

  private getAuthTokenExp(){
    this.endSession = this.auth.getAuthTokenExp();
    // @ts-ignore
    this.endSession = new Date(Date.parse(this.endSession));
  }
}
