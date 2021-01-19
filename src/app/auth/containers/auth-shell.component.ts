import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { Login, Auth } from "../auth";
import { COOKIES, ROUTING } from "src/common/constants/constants";
import { i18n, TRANS } from "src/assets";

import { AuthService } from "../auth.service";
import { CookiesService } from "src/common/services/cookies.service";
import {LoaderService } from "src/common/services/loader.service";
import { NotificationService } from "src/common/services/notification.service";

@Component({
  templateUrl: "./auth-shell.component.html",
})
export class AuthShellComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  auth$: Observable<Auth>;
  errorMessage: string;

  public i18n = i18n;
  public TRANS = TRANS;

  subscription: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private cookiesService: CookiesService,
    private loader: LoaderService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loader.loading$;
    this.cookiesService.deleteAllCookie();
  }

  ngOnDestroy(): void {}

  checkChanged(value: boolean): void {}

  login(login: Login): void {
    this.errorMessage = null;

    this.authService
      .login(login)
      .toPromise()
      .then((auth) => {
        this.successLogin(auth);
      })
      .catch((err) => {
        const { message } = err;

        this.errorMessage =
          message === "Invalid username or password"
            ? "Sorry, invalid credentials."
            : message;

        this.notification.error({
          title: i18n.t(TRANS.notification.loginFail),
          message: this.errorMessage,
        });
      });
  }

  successLogin(auth: any) {
    this.cookiesService.setCookie(COOKIES.token, auth.access_Token, {
      expires: 0.03,
    });

    this.cookiesService.setCookie(COOKIES.refreshToken, auth.refresh_Token, {
      expires: 9,
    });

    this.router.navigate([ROUTING.maintenance]);
  }

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}
