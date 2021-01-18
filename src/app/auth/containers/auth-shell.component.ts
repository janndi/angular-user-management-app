import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { Login, Auth } from "../auth";
import {
  COOKIES,
  ROUTING,
  TWO_FACTOR_AUTH,
} from "src/common/constants/constants";

import { AuthService } from "../auth.service";
import { CookiesService } from "src/common/services/cookies.service";
import { InfivexLoaderService } from "src/common/services/loader.service";

@Component({
  templateUrl: "./auth-shell.component.html",
})
export class AuthShellComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  auth$: Observable<Auth>;
  errorMessage: string;
  is2FA: boolean = false;

  subscription: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private cookiesService: CookiesService,
    private loader: InfivexLoaderService
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
        if (auth !== TWO_FACTOR_AUTH) {
          this.successLogin(auth);
        } else {
          this.is2FA = true;
        }
      })
      .catch((err) => {
        const { message } = err;

        this.errorMessage =
          message === "Invalid username or password"
            ? "Sorry, invalid credentials."
            : message;
      });
  }

  onPinVerify(login: any): void {
    this.errorMessage = null;

    this.authService
      .verify2fa(login)
      .toPromise()
      .then((auth) => {
        this.successLogin(auth);
      })
      .catch((err) => {
        const { message } = err;

        this.errorMessage =
          message === "Invalid Pincode" ? "PIN Code Invalid" : message;
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
