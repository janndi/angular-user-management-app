import { Injectable } from "@angular/core";

import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";

import { handleError } from "../../common/utils";
import { COOKIES } from "../../common/constants/constants";

import { CookiesService } from "../../common/services/cookies.service";
import { InfivexHttpClientService } from "../../common/services/http-client.service";

@Injectable({
  providedIn: "root",
})
export class InfivexDropdownService {
  languageSubscription: Subscription;
  countrySubscription: Subscription;
  currencySubscription: Subscription;

  fileExtensions$ = new BehaviorSubject<any[]>([]);

  constructor(
    private cookiesService: CookiesService,
    private infivexHttp: InfivexHttpClientService
  ) {}
}
