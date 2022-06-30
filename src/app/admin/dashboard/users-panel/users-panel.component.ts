import {Component, OnDestroy, OnInit} from "@angular/core";
import {UsersService} from "../../users.service";
import {User} from "../../../interfaces/user";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Component({
  selector: 'app-users-panel',
  templateUrl: 'users-panel.component.html',
  styleUrls: ['users-panel.component.scss', './../dashboard.component.scss']
})
export class UsersPanelComponent implements OnInit, OnDestroy{
  public users: User[] = [];
  private deleteUserSub: Subscription | undefined;
  private usersSub: Subscription | undefined;
  constructor(private usersService: UsersService,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.usersSub = this.usersService.getAllUsers().subscribe( (users) => {
      this.users = users;
    })
  }

  ngOnDestroy(): void {
    if(this.deleteUserSub){
      this.deleteUserSub.unsubscribe();
    }

    if(this.usersSub){
      this.usersSub.unsubscribe();
    }
  }

  public removeUser(id: string | any, email: string) {
    if(confirm("Are you sure to delete " + email)) {
      this.deleteUserSub = this.usersService.removeUser(id).subscribe(() => {
        this.users = this.users.filter(list => list.id !== id);
        this.notification.showSuccess('user has been deleted', 'Deleted')
      })
    }
  }
}
