import { Component, Input } from "@angular/core";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { i18n, TRANS } from "src/assets";

import {
  FilterService,
  BaseFilterCellComponent,
} from "@progress/kendo-angular-grid";

@Component({
  selector: "dropdown-filter",
  templateUrl: "./dropdown-filter.component.html",
  styleUrls: ["./dropdown-filter.component.scss"],
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {
  public get selectedValue(): any {
    const filter = this.filterByField(this.valueField);
    return filter ? filter.value : null;
  }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;

  public get defaultItem(): any {
    return {
      [this.textField]: i18n.t(TRANS.general.all),
      [this.valueField]: null,
    };
  }

  constructor(filterService: FilterService) {
    super(filterService);
  }

  public onChange(value: any): void {
    this.applyFilter(
      value === null // value of the default item
        ? this.removeFilter(this.valueField) // remove the filter
        : this.updateFilter({
            // add a filter for the field with the value
            field: this.valueField,
            operator: "eq",
            value: value,
          })
    ); // update the root filter
  }
}
