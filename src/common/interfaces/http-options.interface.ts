import { HttpHeaders, HttpParams } from "@angular/common/http/http";

export interface IHttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: "body";
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: "json";
  withCredentials?: boolean;
}
