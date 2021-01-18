import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import {
  Site,
  GetCookieConfig as configuration
} from "../interfaces/cookies.interface";
import { SITE, SECURE } from "../constants/constants";

@Injectable({
  providedIn: "root"
})
export class CookiesService {
  constructor(private cookies: CookieService) {}

  setCookie(
    name: string,
    value: string,
    settings?: Partial<configuration>
  ): void {
    const data = {
      name: name,
      value: value,
      sameSite: SITE as Site,
      secure: SECURE,
      path: "/",
      ...settings
    };

    this.cookies.set(
      data.name,
      data.value,
      data.expires,
      data.path,
      data.domain,
      data.secure,
      data.sameSite
    );
  }

  getCookie(name: string): any {
    return this.cookies.get(name);
  }

  deleteCookie(name: string): void {
    this.cookies.delete(name);
  }

  deleteAllCookie(): void {
    this.cookies.deleteAll();
  }

  checkCookie(name: string): boolean {
    return this.cookies.check(name);
  }
}
