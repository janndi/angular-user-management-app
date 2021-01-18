import { Component, Input } from "@angular/core";
import { COLORS } from "src/assets";

@Component({
  selector: "infivex-icon-status",
  templateUrl: "./icon-status.component.html",
  styleUrls: ["./icon-status.component.css"]
})
export class InfivexIconStatusComponent {
  @Input() status: string | number;
  @Input() locked: boolean;
  public primary = COLORS.primary;
  public warning = COLORS.warning;
  public success = COLORS.success;
  public error = COLORS.error;

  constructor() {}

  ngOnInit(): void {}
}
