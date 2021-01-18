import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ShellComponent } from "./default/containers/shell.component";
import { PageNotFoundComponent } from "./error/404/page-not-found.component";

/* Feature Modules */
import { UserModule } from "./auth/auth.module";
import { FormsModule } from "@angular/forms";

/* Ant Design */
import { IconsProviderModule } from "../common/modules/icons-provider.module";
import { SharedModule } from "../common/modules/shared.module";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import { GridModule } from "@progress/kendo-angular-grid";

import en from "@angular/common/locales/en";

/* 3rd Party Service */
import { CookieService } from "ngx-cookie-service";

registerLocaleData(en);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    GridModule,
    SharedModule,
  ],
  declarations: [AppComponent, ShellComponent, PageNotFoundComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }, CookieService],
})
export class AppModule {}
