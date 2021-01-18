import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormGroupDirective,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription, BehaviorSubject } from "rxjs";

import { i18n, TRANS } from "src/assets";
import {
  COOKIES,
  DROPDOWN,
  ROUTING,
  InfivexRegex,
} from "src/common/constants/constants";
import { GenericValidator } from "src/common/validators/generic-validator";

import { Users } from "../../users";
import { UsersService } from "../../users.service";

import { CookiesService } from "src/common/services/cookies.service";
import { InfivexLoaderService } from "src/common/services/loader.service";
import { InfivexNotificationService } from "src/common/services/notification.service";
import { InfivexDropdownService } from "src/common/services/dropdown.service";
import { isIdExist } from "src/common/utils";

@Component({
  templateUrl: "./users-edit.component.html",
  styleUrls: ["./users-edit.component.less"],
})
export class UsersEditComponent implements OnInit, OnDestroy {
  @ViewChild("userEditForm")
  userEditForm: FormGroupDirective;
  errorMessage: string | null;
  loading$: Observable<boolean>;
  language$: Observable<any>;

  public i18n = i18n;
  public TRANS = TRANS;
  public YES = i18n.t(TRANS.general.yes);
  public NO = i18n.t(TRANS.general.no);
  public gutter = 32;

  user: Users | null;
  userForm: FormGroup;
  requestLoading: boolean = false;

  private subscription: Subscription;
  private formSubscription: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  //dropdown
  status = DROPDOWN.status;

  constructor(
    private router: Router,
    private userService: UsersService,
    private cookiesService: CookiesService,
    private loader: InfivexLoaderService,
    private notification: InfivexNotificationService,
    private dropdown: InfivexDropdownService
  ) {
    this.validationMessages = {};
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loading$ = this.loader.loading$;

    this.userForm = new FormGroup({
      firstName: new FormControl([], Validators.required),
      lastName: new FormControl(""),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      status: new FormControl(""),
      admin: new FormControl(""),
    });

    this.subscription = this.userService.getUser().subscribe((data) => {
      this.displayUser(data);
    });

    // Watch for value changes
    this.formSubscription = this.userForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.userForm
        ))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formSubscription.unsubscribe();
    this.cookiesService.deleteCookie(COOKIES.userId);
  }

  displayUser(user: Users): void {
    this.user = user;

    if (this.user) {
      // Reset the form back to pristine
      this.userForm.reset();

      // Update the data on the form
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        status: user.status,
        admin: user.admin,
      });
    }
  }

  gotoList(): void {
    this.router.navigate([ROUTING.users]);
  }

  save(): void {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }

    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        let user = { ...this.user, ...this.userForm.value };
        user = {
          ...user,
          status: !user.status ? 0 : 1,
        };

        this.updateUser(user);
      }
    }
  }

  updateUser(user: Users): void {
    let userUpdateSubscription = this.userService
      .updateUser(user)
      .subscribe(() => {
        this.notification.success({
          title: i18n.t(TRANS.notification.sucess),
          message: i18n.t(TRANS.users.messages.updated),
        });
        userUpdateSubscription.unsubscribe();
      });
  }

  requestQr(e: MouseEvent): void {
    e.preventDefault();
    this.requestLoading = true;

    this.userService
      .requestQR(this.user.id)
      .toPromise()
      .then(() => {
        this.requestLoading = false;
        this.notification.success({
          title: i18n.t(TRANS.notification.sucess),
          message: `Successfully sent mail`,
        });
      })
      .catch((e) => {
        const { message } = e;
        this.notification.error({
          title: i18n.t(TRANS.notification.updateFail),
          message: message,
        });
      });
  }
}
