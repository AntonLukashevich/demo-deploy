import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string | any, title: string | any){
    this.toastr.success(message, title)
  }

  showError(message: string | any, title: string | any){
    this.toastr.error(message, title)
  }

  showInfo(message: string | any, title: string | any){
    this.toastr.info(message, title)
  }

  showWarning(message: string | any, title: string | any){
    this.toastr.warning(message, title)
  }

}
