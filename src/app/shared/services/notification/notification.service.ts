import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  public showSuccess(message: string | any, title: string | any){
    this.toastr.success(message, title)
  }

  public showError(message: string | any, title: string | any){
    this.toastr.error(message, title)
  }

  public showInfo(message: string | any, title: string | any){
    this.toastr.info(message, title)
  }

  public showWarning(message: string | any, title: string | any){
    this.toastr.warning(message, title)
  }
}
