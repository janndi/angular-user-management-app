import { Component, Input } from "@angular/core";
import { COLORS } from "src/assets";

@Component({
  selector: "title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.css"],
})
export class TitleComponent {
  public primary = COLORS.primary;
  @Input() pageTitle: string;

  constructor() {}

  ngOnInit(): void {}
}
