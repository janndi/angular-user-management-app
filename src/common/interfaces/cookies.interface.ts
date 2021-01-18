import { SITE, SECURE } from "../constants/constants";

/**
 * Cookies
 **/

export type Site = "Lax" | "Strict" | "None";

export interface CookieConfig {
  expires?: number | Date | null;
  path?: string;
  domain?: string | null;
  secure?: boolean;
  sameSite?: Site;
}

export const getCookieConfig = ({
  expires = null,
  path = "",
  domain = null,
  secure = SECURE,
  sameSite = SITE as Site
}: CookieConfig) => ({
  expires,
  path,
  domain,
  secure,
  sameSite
});

export type GetCookieConfig = ReturnType<typeof getCookieConfig>;
