import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { RequestData } from "../models/request-data.model";
import { ShowHideLoaderService } from "./loader.service";
import { IHttpOptions } from "../interfaces/http-options.interface";
import { ENDPOINT } from "src/common/constants/constants";

@Injectable({
  providedIn: "root",
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    private showHideLoader: ShowHideLoaderService
  ) {}
  private createUrl(url: string, localRequest: boolean = true) {
    return localRequest ? ENDPOINT + url : url;
  }

  get(
    url: string,
    options?: IHttpOptions,
    requestData?: RequestData
  ): Observable<any> {
    if (requestData === null || requestData === undefined) {
      requestData = new RequestData();
    }
    return this.showHideLoader.showLoaderAndHideOnCompletion(
      this.httpClient.get(
        this.createUrl(url, requestData.localRequest),
        options
      ),
      requestData
    );
  }

  post(
    url: string,
    body: any | null,
    options?: IHttpOptions,
    requestData?: RequestData
  ): Observable<any> {
    if (requestData === null || requestData === undefined) {
      requestData = new RequestData();
    }
    return this.showHideLoader.showLoaderAndHideOnCompletion(
      this.httpClient.post(
        this.createUrl(url, requestData.localRequest),
        body,
        options
      ),
      requestData
    );
  }

  put(
    url: string,
    body: any | null,
    options?: IHttpOptions,
    requestData?: RequestData
  ): Observable<any> {
    if (requestData === null || requestData === undefined) {
      requestData = new RequestData();
    }
    return this.showHideLoader.showLoaderAndHideOnCompletion(
      this.httpClient.put(
        this.createUrl(url, requestData.localRequest),
        body,
        options
      ),
      requestData
    );
  }

  delete(
    url: string,
    options?: IHttpOptions,
    requestData?: RequestData
  ): Observable<any> {
    if (requestData === null || requestData === undefined) {
      requestData = new RequestData();
    }
    return this.showHideLoader.showLoaderAndHideOnCompletion(
      this.httpClient.delete(
        this.createUrl(url, requestData.localRequest),
        options
      ),
      requestData
    );
  }

  batchDelete(
    url: string,
    id: any[] = [],
    options?: IHttpOptions,
    requestData?: RequestData
  ): Observable<any> {
    if (requestData === null || requestData === undefined) {
      requestData = new RequestData();
    }
    return this.showHideLoader.showLoaderAndHideOnCompletion(
      this.httpClient.put(
        this.createUrl(url, requestData.localRequest),
        id,
        options
      ),
      requestData
    );
  }
}
