import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError, shareReplay, map } from "rxjs/operators";

import { Auth, Login, Activate } from "./auth";
import { handleError } from "src/common/utils";
import {
  AUTH_ENDPOINT,
  COOKIES,
  ENDPOINT,
} from "src/common/constants/constants";

import { CookiesService } from "src/common/services/cookies.service";
import { HttpClientService } from "src/common/services/http-client.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  redirectUrl: string;

  constructor(
    private cookiesService: CookiesService,
    private http: HttpClientService
  ) {}

  isLoggedIn(): boolean {
    return this.cookiesService.checkCookie(COOKIES.token);
  }

  login(login: Login): Observable<Auth | any> {
    const url = `${AUTH_ENDPOINT}/token/connect`;

    return this.http
      .post(url, login, {}, { showLoader: true, localRequest: false })
      .pipe(catchError(handleError));
  }

  verify2fa(verify: any): Observable<any> {
    const url = `${ENDPOINT}/twofactor/validate-user`;

    return this.http
      .post(url, verify, {}, { showLoader: true, localRequest: false })
      .pipe(catchError(handleError));
  }

  activateUser(activate: Activate): Observable<Activate> {
    const url = `/user/reset-and-activate`;
    const headers = {};

    return this.http
      .post(
        url,
        activate,
        { headers },
        { showLoader: true, localRequest: true }
      )
      .pipe(
        map((data) => data),
        tap((data) => (activate._cURL = data._cURL)),
        catchError(handleError)
      );
  }

  resetPassword(data: Login): Observable<Login> {
    const url = `/user/forgot-password-send-mail`;
    const headers = {};

    return this.http
      .post(url, data, { headers }, { showLoader: true, localRequest: true })
      .pipe(
        map(() => data),
        catchError(handleError)
      );
  }

  validateActivation(id: string) {
    const url = `/user/validate-activation-id/${id}`;
    const headers = {};

    return this.http
      .get(url, { headers }, { showLoader: true, localRequest: true })
      .pipe(catchError(handleError));
  }

  logout(): Observable<any> {
    const url = `${AUTH_ENDPOINT}/token/revoke`;
    const refreshToken = {
      refreshToken: this.cookiesService.getCookie(COOKIES.refreshToken),
    };

    return this.http
      .post(url, refreshToken, {}, { showLoader: false, localRequest: false })
      .pipe(shareReplay(), catchError(handleError));
  }

  refresh(): Observable<Auth> {
    const url = `${AUTH_ENDPOINT}/token/refresh`;
    const refreshToken = {
      refreshToken: this.cookiesService.getCookie(COOKIES.refreshToken),
    };

    return this.http
      .post(url, refreshToken, {}, { showLoader: false, localRequest: false })
      .pipe(shareReplay(), catchError(handleError));
  }
}
