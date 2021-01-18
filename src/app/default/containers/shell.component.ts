import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  OnDestroy
} from "@angular/core";

import { Router } from "@angular/router";
import { Observable, interval, Subscription } from "rxjs";

import { IMAGES, COLORS, i18n, TRANS } from "src/assets";
import { COOKIES } from "src/common/constants/constants";
import { ROUTING } from "src/common/constants/constants";

import { CookiesService } from "src/common/services/cookies.service";

import { Users } from "../../users/users";
import { UsersService } from "../../users/users.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "pm-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit, OnDestroy {
  public i18n = i18n;
  public TRANS = TRANS;
  public logo = IMAGES.logo;
  public miniLogo = IMAGES.logo_mini;
  public sider = `url(${IMAGES.sider_bg})`;
  public sideBg = COLORS.layoutHeaderBackground;
  isCollapsed = false;
  innerHeight = true;
  me$: Observable<Users>;

  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private cookiesService: CookiesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.me$ = this.userService.me$;
    this.innerHeight = window.innerHeight > 600;

    const minute = interval(900000);

    // every 30 minutes triggers refresh token
    this.subscription = minute.subscribe(() => {
      this.authService
        .refresh()
        .toPromise()
        .then(auth => {
          this.cookiesService.setCookie(COOKIES.token, auth.access_Token, {
            expires: 0.03
          });

          this.cookiesService.setCookie(
            COOKIES.refreshToken,
            auth.refresh_Token,
            {
              expires: 9
            }
          );
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService
      .logout()
      .toPromise()
      .then(() => this.cookiesService.deleteAllCookie())
      .then(() => {
        window.location.href = "/";
      });
  }

  @HostListener("window:resize", ["$event"])
  onResize(_event: any) {
    this.innerHeight = window.innerHeight > 700;
  }

  open() {
    this.router.navigate([ROUTING.maintenance]);
  }
}
