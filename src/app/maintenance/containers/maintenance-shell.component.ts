import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { COLORS, i18n, TRANS, IMAGES } from "src/assets";
import { ROUTING } from "src/common/constants/constants";

import { Users } from "src/app/users/users";
import { UsersService } from "src/app/users/users.service";

import { MaintenanceService } from "src/app/maintenance/maintenance.service";

@Component({
  templateUrl: "./maintenance-shell.component.html",
  styleUrls: ["./maintenance-shell.component.less"],
})
export class MaintenanceShellComponent implements OnInit {
  me$: Observable<Users>;
  public i18n = i18n;
  public TRANS = TRANS;
  public primary = COLORS.primary;
  public gutter = 24;
  public routing = ROUTING;
  public images = {
    company: IMAGES.company,
    module: IMAGES.module,
    user: IMAGES.user,
    role: IMAGES.roles,
    tenant: IMAGES.tenant,
    group: IMAGES.group,
  };

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.me$ = this.userService.me$;
  }

  routeTo(route: string): void {
    this.router.navigate([route]);
    this.maintenanceService.openCreate$.next(true);
  }
}
