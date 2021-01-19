import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { COLORS, i18n, TRANS } from "src/assets";
import { COOKIES } from "src/common/constants/constants";
import { Observable, interval, Subscription } from "rxjs";

import { CookiesService } from "src/common/services/cookies.service";

import { Users } from "../../../app/users/users";
import { UsersService } from "../../../app/users/users.service";
import { AuthService } from "../../../app/auth/auth.service";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public primary = COLORS.primary;
  public i18n = i18n;
  public TRANS = TRANS;
  innerHeight = true;
  @Input() pageTitle: string;
  @Input() tab: string[];
  @Input() titleOnly: boolean = false;
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();
  me$: Observable<Users>;

  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private cookiesService: CookiesService
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
        .then((auth) => {
          this.cookiesService.setCookie(COOKIES.token, auth.access_Token, {
            expires: 0.03,
          });

          this.cookiesService.setCookie(
            COOKIES.refreshToken,
            auth.refresh_Token,
            {
              expires: 9,
            }
          );
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateTo(title: string) {
    this.navigate.emit(title);
  }

  action(): void {
    this.save.emit();
  }

  back(): void {
    this.close.emit();
  }
}
