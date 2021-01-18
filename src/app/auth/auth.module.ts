import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../../common/modules/shared.module";

import { LoginComponent } from "./components/auth-login/login.component";
import { AuthShellComponent } from "./containers/auth-shell.component";

const userRoutes: Routes = [{ path: "login", component: AuthShellComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(userRoutes)],
  declarations: [
    LoginComponent,
    AuthShellComponent,
  ],
})
export class UserModule {}
