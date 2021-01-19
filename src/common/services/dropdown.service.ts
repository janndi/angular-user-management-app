import { Injectable } from "@angular/core";

import { BehaviorSubject, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DropdownService {
  languageSubscription: Subscription;
  countrySubscription: Subscription;
  currencySubscription: Subscription;

  fileExtensions$ = new BehaviorSubject<any[]>([]);

  constructor() {}
}
