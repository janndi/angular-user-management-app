import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../../common/modules/shared.module";

import { UsersListComponent } from "./components/users-list/users-list.component";
import { UsersEditComponent } from "./components/users-edit/users-edit.component";
import { UsersNewComponent } from "./components/users-new/users-new.component";

const usersRoutes: Routes = [
  { path: "", component: UsersListComponent },
  { path: "edit", component: UsersEditComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(usersRoutes)],
  declarations: [UsersListComponent, UsersEditComponent, UsersNewComponent],
})
export class UsersModule {}
