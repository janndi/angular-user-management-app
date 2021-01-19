import { Component, Input } from "@angular/core";
import { COLORS } from "src/assets";

@Component({
  selector: "icon-status",
  templateUrl: "./icon-status.component.html",
  styleUrls: ["./icon-status.component.css"],
})
export class IconStatusComponent {
  @Input() status: number;
  isDeleted: boolean;
  public primary = COLORS.primary;
  public warning = COLORS.warning;
  public success = COLORS.success;
  public error = COLORS.error;

  constructor() {}

  ngOnInit(): void {
    this.isDeleted = this.status == 1;
  }
}
