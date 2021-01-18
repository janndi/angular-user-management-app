import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  FormControl,
  ValidationErrors,
} from "@angular/forms";
import { Observable, Subscription, Observer, BehaviorSubject } from "rxjs";

import { i18n, TRANS } from "src/assets";
import { DROPDOWN, InfivexRegex } from "src/common/constants/constants";
import { GenericValidator } from "src/common/validators/generic-validator";

import { Users } from "../../users";
import { UsersService } from "../../users.service";

import { MaintenanceService } from "src/app/maintenance/maintenance.service";
import { InfivexLoaderService } from "src/common/services/loader.service";
import { InfivexNotificationService } from "src/common/services/notification.service";
import { InfivexDropdownService } from "src/common/services/dropdown.service";

@Component({
  selector: "infivex-user-create",
  templateUrl: "./users-new.component.html",
  styleUrls: ["./users-new.component.less"],
})
export class UsersNewComponent implements OnInit, OnDestroy, OnChanges {
  @Input() visible: boolean;
  @Output() closeCreate = new EventEmitter<boolean>();
  @ViewChild("userNewForm")
  userEditForm: FormGroupDirective;
  errorMessage: string | null;
  loading$: Observable<boolean>;
  language$: Observable<any>;
  logo$ = new BehaviorSubject<string>("");

  public i18n = i18n;
  public TRANS = TRANS;
  public YES = i18n.t(TRANS.general.yes);
  public NO = i18n.t(TRANS.general.no);
  public gutter = 32;
  public formPage = true;

  user: Users | null;
  userForm: FormGroup;
  feedback: boolean = true;
  emailTaken: boolean = false;
  private formSubscription: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  //dropdown
  status = DROPDOWN.status;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private maintenanceService: MaintenanceService,
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

    this.displayUser(this.userService.newUser());

    // Watch for value changes
    this.formSubscription = this.userForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.userForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
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

  save(): void {
    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        let user = { ...this.user, ...this.userForm.value };
        user.image = this.logo$.getValue().split(",")[1];

        this.createUser(user);
      }
    }
  }

  createUser(user: Users): void {
    this.userService
      .createUser(user)
      .toPromise()
      .then(() => {
        this.close();

        this.notification.success({
          title: i18n.t(TRANS.notification.sucess),
          message: i18n.t(TRANS.users.messages.created),
        });
      });
  }

  close(): void {
    this.formPage = true;
    this.displayUser(this.user);
    this.logo$.next("");
    this.maintenanceService.openCreate$.next(false);
    this.closeCreate.emit(false);
  }

  next(): void {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      if (!this.userForm.controls.email.valid)
        this.userForm.controls[i].updateValueAndValidity();
    }

    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        this.formPage = false;
      }
    }
  }

  back(): void {
    this.formPage = true;
  }

  emailAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.userService
        .validateEmail(control.value)
        .toPromise()
        .then(() => {
          this.emailTaken = false;
          observer.next(null);
        })
        .catch((err) => {
          this.emailTaken = true;
          observer.next({ error: true });
        })
        .finally(() => {
          observer.complete();
        });
    });

  onEmailChange(): void {
    if (this.userForm.value.email === "") {
      this.emailTaken = false;
      let emailControl = this.userForm.get("email");
      emailControl.setValidators([
        Validators.required,
        Validators.pattern(InfivexRegex.emailRegex),
      ]);
      emailControl.updateValueAndValidity();
    }
  }

  logoChange(logo: string): void {
    this.logo$.next(logo);
  }
}
