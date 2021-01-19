import { LABELS } from "src/assets/assests.config";
import { environment } from "src/environments/environment";

/**
 * Constant global variable.
 **/

export const IS_DEFAULT = environment.LABEL === LABELS.main;
export const ENDPOINT = `${environment.END_POINT}/${environment.VERSION}`;
export const AUTH_ENDPOINT = `${environment.END_POINT}/auth`;
export const SITE = environment.SITE;
export const SECURE = environment.SECURE;

/**
 * Cookie Name
 **/

export const COOKIES = {
  token: "token",
  refreshToken: "refreshToken",
  userId: "__user",
  me: "___me",
};

export const STORAGE = {
  productCompanyId: "productCompanyId",
  companyId: "companyId",
};

/**
 * Routing Name
 **/

export const ROUTING = {
  maintenance: "maintenance",
  login: "login",
  users: "users",
  userUpdate: "users/edit",
};

/**
 * Dropdown
 **/

export const DROPDOWN = {
  status: [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "In-active",
      value: 0,
    },
  ],
};

/**
 * Regex
 **/

export class Regex {
  static emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
