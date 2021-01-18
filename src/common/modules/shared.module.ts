import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { GridModule } from "@progress/kendo-angular-grid";
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { NgProgressModule } from "ngx-progressbar";
import { InfivexHeaderComponent } from "../components/header/header.component";
import { InfivexTitleComponent } from "../components/title/title.component";
import { InfivexCardTitleComponent } from "../components/card-title/card-title.component";
import { InfivexTransferComponent } from "../components/transfer/transfer.component";
import { InfivexIconStatusComponent } from "../components/icon-status/icon-status.component";
import { InfivexLoaderComponent } from "../components/loader/loader.component";
import { InfivexDropDownListFilterComponent } from "../components/dropdown-filter/dropdown-filter.component";

import { COLORS } from "src/assets";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    GridModule,
    DropDownListModule,
    NgProgressModule.withConfig({
      color: COLORS.primary,
    }),
  ],
  declarations: [
    InfivexHeaderComponent,
    InfivexTitleComponent,
    InfivexCardTitleComponent,
    InfivexTransferComponent,
    InfivexIconStatusComponent,
    InfivexLoaderComponent,
    InfivexDropDownListFilterComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    GridModule,
    DropDownListModule,
    InfivexHeaderComponent,
    InfivexTitleComponent,
    InfivexCardTitleComponent,
    InfivexTransferComponent,
    InfivexIconStatusComponent,
    InfivexLoaderComponent,
    InfivexDropDownListFilterComponent,
  ],
})
export class SharedModule {}
