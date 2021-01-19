import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { INotification } from "../interfaces/notification.interface";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  success(options?: INotification): void {
    this.notification.create("success", options.title, options.message);
  }

  info(options?: INotification): void {
    this.notification.create("info", options.title, options.message);
  }

  warning(options?: INotification): void {
    this.notification.create("warning", options.title, options.message);
  }

  error(options?: INotification): void {
    this.notification.create("error", options.title, options.message);
  }

  message(options?: INotification, type?: string): void {
    this.notification.create(type, options.title, options.message);
  }
}
