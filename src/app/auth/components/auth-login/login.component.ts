import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { Observable, Subscription } from "rxjs";

import { GenericValidator } from "src/common/validators/generic-validator";
import { IMAGES, i18n, TRANS, COLORS } from "src/assets";
import { Login } from "../../auth";
import { AuthService } from "../../auth.service";
import { NotificationService } from "src/common/services/notification.service";
import { LoaderService } from "src/common/services/loader.service";
import { Regex } from "src/common/constants/constants";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("resetForm")
  RoleEditForm: FormGroupDirective;
  @Input() errorMessage: string | null;
  @Input() loading: boolean;
  @Input() is2FA: boolean;
  @Output() login = new EventEmitter<Login>();
  @Output() checked = new EventEmitter<boolean>();
  @Output() pin = new EventEmitter<any>();

  public background = `url(${IMAGES.authBackground})`;
  public logo = IMAGES.logoBlack;
  public primary = COLORS.primary;

  titleBoxText: string = i18n.t(TRANS.login.titleBox.welcome);
  resetLoading$: Observable<boolean>;
  isMailSent: Boolean = false;
  loginForm: FormGroup;
  resetForm: FormGroup;
  isForgotPassword: Boolean = false;
  passwordVisible = false;
  password: string;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  resetSubscription: Subscription;
  loginSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private authService: AuthService,
    private loader: LoaderService
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      username: {
        required: "Email is required.",
        pattern: "Email is not valid.",
      },
      password: {
        required: "Password is required.",
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.resetLoading$ = this.loader.loading$;
    // Define the form group
    this.loginForm = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.pattern(Regex.emailRegex)],
      ],
      password: [null, [Validators.required]],
    });

    this.resetForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern(Regex.emailRegex)],
      ],
    });

    // Watch for value changes
    this.loginSubscription = this.loginForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(
        this.loginForm
      );

      this.errorMessage = null;
    });

    // Watch for value changes
    this.resetSubscription = this.resetForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.resetForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.is2FA) {
      this.is2FA = changes.is2FA.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.resetSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  gotoForgotPassword(): void {
    this.titleBoxText = i18n.t(TRANS.login.titleBox.forgotPassword);
    this.isForgotPassword = true;
  }

  gotoLogin(): void {
    this.isForgotPassword = false;
    this.isMailSent = false;
    this.titleBoxText = i18n.t(TRANS.login.titleBox.welcome);
  }

  loginSubmit(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      if (this.loginForm.dirty) {
        const login = {
          username: this.loginForm.value.username.trim(),
          password: this.loginForm.value.password.trim(),
        };
        this.login.emit(login);
      }
    }
  }
}
