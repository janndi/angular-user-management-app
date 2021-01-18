import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "src/common/modules/shared.module";

import { MaintenanceShellComponent } from "./containers/maintenance-shell.component";

const administratorRoutes: Routes = [
  { path: "", component: MaintenanceShellComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(administratorRoutes)],
  declarations: [MaintenanceShellComponent]
})
export class MaintenanceModule {}
