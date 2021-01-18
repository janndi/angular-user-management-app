import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate
} from "@angular/router";

import { ROUTING } from "src/common/constants/constants";

import { AuthService } from "./auth.service";
import { CookiesService } from 'src/common/services/cookies.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookiesService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Retain the attempted URL for redirection
    this.authService.redirectUrl = url;
    this.cookieService.deleteAllCookie();
    this.router.navigate([ROUTING.login]);
    return false;
  }
}
