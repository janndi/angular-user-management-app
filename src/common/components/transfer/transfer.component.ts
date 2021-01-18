import { Component, OnInit } from "@angular/core";
import { TransferItem } from "ng-zorro-antd/transfer";

@Component({
  selector: "infivex-transfer",
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer.component.scss"],
})
export class InfivexTransferComponent implements OnInit {
  list: TransferItem[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? "right" : undefined,
      });
    }
  }

  // tslint:disable-next-line:no-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {}

  select(ret: {}): void {}

  change(ret: {}): void {}
}
