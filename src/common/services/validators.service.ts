import { Injectable } from "@angular/core";
import {
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { debounceTime, switchMap, map, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Regex } from "../constants/constants";

@Injectable({
  providedIn: "root",
})
export class ValidatorsService {
  getRequiredFieldValidator(messageKey: string) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("required"),
      validator: Validators.required,
      isAsync: false,
    };
  }

  getEmailFormatValidator(messageKey: string) {
    return {
      messageKey,
      check: (control: FormControl) => control.hasError("pattern"),
      validator: Validators.pattern(Regex.emailRegex),
      isAsync: false,
    };
  }

  getNumericFieldValidator(messageKey: string) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("pattern"),
      validator: Validators.pattern("^[-+]?(0|[1-9][0-9]*)$"),
      isAsync: false,
    };
  }

  getDecimalValidator(messageKey: string, decimals: number = 2) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("pattern"),
      validator: Validators.pattern(
        "^-?\\d+(\\.\\d{1,{0}})?$".replace("{0}", decimals.toString())
      ),
      isAsync: false,
    };
  }

  getEmptySpaceValidator(messageKey: string) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("emptySpace"),
      validator: (control: FormControl) =>
        (control.value ? control.value : 0).toString().trim() == ""
          ? {
              emptySpace: true,
            }
          : {},
      isAsync: false,
    };
  }

  getPositiveNumbersValidator(messageKey: string) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("positiveNumbersOnly"),
      validator: (control: FormControl) =>
        (control.value ? control.value : 0) < 0
          ? {
              positiveNumbersOnly: true,
            }
          : {},
      isAsync: false,
    };
  }

  getMatchWithOtherControlValidator(messageKey: string, control: FormControl) {
    return {
      messageKey: messageKey,
      check: (formControl: FormControl) =>
        formControl.hasError("fieldsNotMatch"),
      validator: (formControl: FormControl) =>
        (formControl.value ? formControl.value : "") !==
        (control.value ? control.value : "")
          ? {
              fieldsNotMatch: true,
            }
          : {},
      isAsync: false,
    };
  }

  createUniquenessValidator(
    uniquenessChecker: (control: string) => Observable<any>,
    formControl: FormControl
  ) {
    return formControl.valueChanges
      .pipe(debounceTime(1000))
      .pipe(
        switchMap((value: string) => {
          return uniquenessChecker(value);
        })
      )
      .pipe(
        map((found: boolean) => {
          return !found ? null : { isNotUnique: true };
        })
      )
      .pipe(take(1));
  }

  getLengthValidator(messageKey: string) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("minlength"),
      getMessageInterpolationParams: () => {
        return {
          0: environment.passwordRequirements.passwordRequiredLength.toString(),
        };
      },
      validator: Validators.minLength(
        environment.passwordRequirements.passwordRequiredLength
      ),
      isAsync: false,
    };
  }

  getHasNumberValidator(messageKey: string) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("hasDigit"),

      validator: (formControl: FormControl) =>
        environment.passwordRequirements.passwordRequireDigit
          ? (formControl.value ? formControl.value : "").match(/\d/)
            ? {}
            : { hasDigit: true }
          : {},

      isAsync: false,
    };
  }

  getHasCapitalCaseValidator(messageKey: string) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("hasCapitalCase"),
      validator: (formControl: FormControl) =>
        environment.passwordRequirements.passwordRequireUppercase
          ? (formControl.value ? formControl.value : "").match(/[A-Z]/)
            ? {}
            : { hasCapitalCase: true }
          : {},
      isAsync: false,
    };
  }

  getHasSmallCaseValidator(messageKey: string) {
    return {
      messageKey: messageKey,
      check: (control: FormControl) => control.hasError("hasCapitalLowerCase"),
      validator: (formControl: FormControl) =>
        environment.passwordRequirements.passwordRequireLowercase
          ? (formControl.value ? formControl.value : "").match(/[a-z]/)
            ? {}
            : { hasCapitalLowerCase: true }
          : {},
      isAsync: false,
    };
  }
}
