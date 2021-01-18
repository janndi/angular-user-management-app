import { Injectable } from "@angular/core";

import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { catchError, tap, map, shareReplay } from "rxjs/operators";

import { Users } from "./users";

import {
  handleError,
  singlePushInArray,
  singleReplaceInArray,
  mapUsers,
  mapUser,
  mapMe,
  multipleRemoveArray,
} from "src/common/utils";

import { COOKIES } from "src/common/constants/constants";
import { CookiesService } from "src/common/services/cookies.service";
import { InfivexHttpClientService } from "src/common/services/http-client.service";
import { setAppLanguage } from "src/assets";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private _users = this.getUsers(true);
  private users: Users[];

  users$ = new BehaviorSubject<Users[]>([]);
  me$ = new BehaviorSubject<Users>(null);

  userSubscription: Subscription;
  meSubscription: Subscription;

  constructor(
    private cookiesService: CookiesService,
    private infivexHttp: InfivexHttpClientService
  ) {
    this.userSubscription = this._users.subscribe((users) => {
      this.users$.next(users);
      this.userSubscription.unsubscribe();
    });

    this.meSubscription = this.me().subscribe((me) => {
      this.me$.next(me);
      this.meSubscription.unsubscribe();
    });
  }

  getUsers(loading: boolean): Observable<Users[]> {
    const url = `/user`;
    const accessToken = this.cookiesService.getCookie(COOKIES.token);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.infivexHttp
      .get(url, { headers }, { showLoader: loading, localRequest: true })
      .pipe(
        map((users) => mapUsers(users)),
        tap((data) => (this.users = data)),
        shareReplay(),
        catchError(handleError)
      );
  }

  validateEmail(email: string) {
    const url = `/user/validate-email`;
    const accessToken = this.cookiesService.getCookie(COOKIES.token);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const payload = {
      email: `${email}`,
    };

    return this.infivexHttp
      .post(url, payload, { headers }, { showLoader: true, localRequest: true })
      .pipe(
        map((res) => res),
        shareReplay(),
        catchError(handleError)
      );
  }

  getUser(): Observable<Users> {
    const id = this.cookiesService.getCookie(COOKIES.userId);
    const url = `/user/${id}`;
    const accessToken = this.cookiesService.getCookie(COOKIES.token);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.infivexHttp
      .get(url, { headers }, { showLoader: true, localRequest: true })
      .pipe(
        map((user) => mapUser(user)),
        shareReplay(),
        catchError(handleError)
      );
  }

  // Return an initialized users
  newUser(): Users {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      status: 1,
      admin: false,
    };
  }

  createUser(user: Users): Observable<Users> {
    const url = `/user`;
    const accessToken = this.cookiesService.getCookie(COOKIES.token);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.infivexHttp
      .post(url, user, { headers }, { showLoader: true, localRequest: true })
      .pipe(
        map((user) => mapUser(user)),
        tap((data) => (this.users = singlePushInArray(this.users, data))),
        tap(() => this.users$.next(this.users)),
        shareReplay(),
        catchError(handleError)
      );
  }

  updateUser(user: Users): Observable<Users> {
    const url = `/user/${user.id}`;
    const accessToken = this.cookiesService.getCookie(COOKIES.token);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.infivexHttp
      .put(url, user, { headers }, { showLoader: true, localRequest: true })
      .pipe(
        map((user) => mapUser(user)),
        tap((user) => (this.users = singleReplaceInArray(this.users, user))),
        tap(() => this.users$.next(this.users)),
        shareReplay(),
        catchError(handleError)
      );
  }

  deleteUser(id: string[]): Observable<{}> {
    const url = `/user/delete-multiple`;
    const accessToken = this.cookiesService.getCookie(COOKIES.token);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.infivexHttp
      .batchDelete(
        url,
        id,
        { headers },
        { showLoader: true, localRequest: true }
      )
      .pipe(
        tap(() => (this.users = multipleRemoveArray(this.users, id))),
        tap(() => this.users$.next(this.users)),
        shareReplay(),
        catchError(handleError)
      );
  }

  me(): Observable<Users> {
    const url = `/user/me`;
    const accessToken = this.cookiesService.getCookie(COOKIES.token);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.infivexHttp
      .get(url, { headers }, { showLoader: true, localRequest: true })
      .pipe(
        map((user) => mapMe(user)),
        tap((me) => {
          this.cookiesService.setCookie(COOKIES.me, me.id, { expires: 1 });
        }),
        shareReplay(),
        catchError(handleError)
      );
  }

  requestQR(id: string): Observable<any> {
    const url = `/twofactor/send-mail-qr-code`;
    const accessToken = this.cookiesService.getCookie(COOKIES.token);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.infivexHttp
      .post(
        url,
        { userId: id },
        { headers },
        { showLoader: true, localRequest: true }
      )
      .pipe(catchError(handleError));
  }
}
