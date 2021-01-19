import { FormControl } from "@angular/forms";
import { FormControlDetails } from "./form-control.model";

export class Control extends FormControl {
  errorChecks: Array<FormControlDetails>;
  controlName: string;
  constructor(
    controlName = "",
    public _errorChecks: Array<FormControlDetails> = []
  ) {
    super(
      "",
      _errorChecks.filter((t) => !t.isAsync).map((ec) => ec.validator),
      _errorChecks.filter((t) => t.isAsync).map((ec) => ec.validator)
    );
    this.errorChecks = _errorChecks;
    this.controlName = controlName;
  }
}
