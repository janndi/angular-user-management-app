import { Component, Input } from "@angular/core";
import { COLORS } from "src/assets";

@Component({
  selector: "card-title",
  templateUrl: "./card-title.component.html",
  styleUrls: ["./card-title.component.css"]
})
export class CardTitleComponent {
  public primary = COLORS.primary;
  @Input() pageTitle: string;

  constructor() {}

  ngOnInit(): void {}
}
