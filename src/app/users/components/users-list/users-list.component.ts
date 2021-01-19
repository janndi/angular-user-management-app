import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { PagerSettings, RowClassArgs } from "@progress/kendo-angular-grid";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";

import { COLORS, i18n, TRANS } from "src/assets";
import { COOKIES, ROUTING } from "src/common/constants/constants";
import { getSelectedRow } from "src/common/utils";

import { Users } from "../../users";
import { UsersService } from "../../users.service";

import { CookiesService } from "src/common/services/cookies.service";
import { LoaderService } from "src/common/services/loader.service";
import { NotificationService } from "src/common/services/notification.service";
import { MaintenanceService } from "src/app/maintenance/maintenance.service";

@Component({
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit, OnDestroy, OnChanges {
  public i18n = i18n;
  public TRANS = TRANS;
  public success = COLORS.success;
  public error = COLORS.error;
  public highlight = COLORS.rowSelected;

  loading$: Observable<boolean>;
  users$: Observable<Users[]>;
  me$: Observable<Users>;
  selectedRow: any = null;
  idSelected: string[] = [];
  distinctDropdownLanguage: any[];
  distinctDropdownRole: any[];
  openCreate: boolean = false;
  users: any[];
  isAdmin: boolean;

  private subscription: Subscription;

  pageableSettings: PagerSettings = {
    pageSizes: [30, 40, 50, 100],
    buttonCount: 4,
  };
  gridData: any;
  confirmModal: NzModalRef; // For testing by now

  constructor(
    private userService: UsersService,
    private cookiesService: CookiesService,
    private router: Router,
    private loader: LoaderService,
    private maintenanceService: MaintenanceService,
    private notification: NotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loader.loading$;
    this.users$ = this.userService.users$;
    this.openCreate = this.maintenanceService.openCreate$.getValue();

    this.userService
      .getUsers(true)
      .toPromise()
      .then((users) => {
        this.users = users;
      });

    this.subscription = this.userService.me().subscribe((data) => {
      this.isAdmin = data.admin;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  create(): void {
    this.openCreate = true;
  }

  edit(): void {
    this.router.navigate([ROUTING.userUpdate]);
  }

  deleteConfirm(): void {
    this.modal.confirm({
      nzTitle: i18n.t(TRANS.general.confirm),
      nzContent: i18n.t(TRANS.users.messages.deleteConfimation),
      nzOkText: i18n.t(TRANS.general.yes),
      nzOkType: "danger",
      nzOnOk: () => this.delete(),
      nzCancelText: i18n.t(TRANS.general.no),
    });
  }

  delete() {
    this.userService
      .deleteUser(this.idSelected.toString())
      .toPromise()
      .then(() => {
        this.idSelected = [];
        this.refresh();
        this.notification.success({
          title: i18n.t(TRANS.notification.deleted),
          message: i18n.t(TRANS.users.messages.deleted),
        });
      });
  }

  refresh(): void {
    this.userService
      .getUsers(true)
      .toPromise()
      .then((users) => this.userService.users$.next(users));
  }

  close() {
    this.router.navigate([ROUTING.maintenance]);
  }

  rowStylingCallback(context: RowClassArgs) {
    return {
      "row-styling": true,
    };
  }

  selectedKeysChange() {
    this.selectedRow = getSelectedRow(this.idSelected[0], this.users);
    this.cookiesService.setCookie(COOKIES.userId, this.idSelected[0], {
      expires: 1,
    });
  }

  hasRights(): boolean {
    return this.isAdmin;
  }

  hasSelectedId(): boolean {
    return this.idSelected.length == 0 ? false : true;
  }
}
