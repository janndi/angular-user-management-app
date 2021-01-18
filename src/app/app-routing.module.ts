import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth-guard.service";

import { ShellComponent } from "./default/containers/shell.component";
import { PageNotFoundComponent } from "./error/404/page-not-found.component";

const appRoutes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "maintenance",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./maintenance/maintenance.module").then(
            (m) => m.MaintenanceModule
          ),
      },
      {
        path: "users",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./users/users.module").then((m) => m.UsersModule),
      },
      { path: "", redirectTo: "users", pathMatch: "full" },
    ],
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
