import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";

import { ILoaderState } from "../../interfaces/loader-state.interface";
import { LoaderService } from "../../services/loader.service";

import { NgProgressRef, NgProgress } from "ngx-progressbar";

@Component({
  selector: "loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit, OnDestroy {
  show: boolean;
  progressRef: NgProgressRef;

  private subscription: Subscription;
  constructor(
    private loaderService: LoaderService,
    private cDef: ChangeDetectorRef,
    private progress: NgProgress
  ) {}

  ngOnInit() {
    this.progressRef = this.progress.ref("Progress");

    this.subscription = this.loaderService.loaderState.subscribe(
      (state: ILoaderState) => {
        this.show = state.show;
        this.show ? this.progressRef.start() : this.progressRef.complete();
        this.cDef.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
