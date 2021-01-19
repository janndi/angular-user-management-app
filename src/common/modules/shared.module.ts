import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { GridModule } from "@progress/kendo-angular-grid";
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { NgProgressModule } from "ngx-progressbar";
import { HeaderComponent } from "../components/header/header.component";
import { TitleComponent } from "../components/title/title.component";
import { CardTitleComponent } from "../components/card-title/card-title.component";
import { IconStatusComponent } from "../components/icon-status/icon-status.component";
import { LoaderComponent } from "../components/loader/loader.component";
import { DropDownListFilterComponent } from "../components/dropdown-filter/dropdown-filter.component";

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
    HeaderComponent,
    TitleComponent,
    CardTitleComponent,
    IconStatusComponent,
    LoaderComponent,
    DropDownListFilterComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    GridModule,
    DropDownListModule,
    HeaderComponent,
    TitleComponent,
    CardTitleComponent,
    IconStatusComponent,
    LoaderComponent,
    DropDownListFilterComponent,
  ],
})
export class SharedModule {}
