import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MaintenanceService {
  openCreate$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.openCreate$.next(false);
  }
}
