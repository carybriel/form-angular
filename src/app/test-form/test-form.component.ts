import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, ValidationErrors} from '@angular/forms';
import { Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css'],
})

//
// The component
//
export class TestFormComponent implements OnInit {

  // Array used ot populate "How did you hear of us?" dropdown
  howstrings: string[] = [
    'Social media',
    'From a friend',
    'Email',
    'Other',
  ];

  // *
  // * Form and field controls are created.
  // *
  // * Some simple field validators are specified on the control level.
  // * Others w/ more complicated logic are calculated programmatically below.
  // *
  testForm = new FormGroup({
    firstName: new FormControl('', Validators.required ),
    lastName: new FormControl('', Validators.required ),
    phone: new FormControl('', Validators.required ),
    email: new FormControl('', { validators: [ Validators.required, Validators.pattern('.+\@.+\..+') ], updateOn: 'blur' } ),
    promoCode: new FormControl(''),
    how: new FormControl(''),
    howOther: new FormControl('', Validators.required ),
    terms: new FormControl(''),
  }, { validators: validateFields });

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    // Not implemented at the moment.
  }

  // Handles keypress events from phone field and only permits numeric
  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    // If invalid, prevent default behaviour.
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // Handles keypress events from phone field and only permits alphanumeric
  keyPressAlphaNumeric(event: any) {
    const pattern = /[0-9A-Za-z]/;
    const inputChar = String.fromCharCode(event.charCode);

    // If invalid, prevent default behaviour.
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}

// Validates all for fields whenever form change is detected.
// Used to determine if green success box should be displayed above the form.
export const validateFields: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//    debugger;
  let valid = true;
  const invalid = 'invalid';

  if (control.controls.firstName.invalid) { valid = false; }
  if (control.controls.lastName.invalid) { valid = false; }
  if (control.controls.phone.invalid) { valid = false; }
  if (control.controls.email.invalid) { valid = false; }
  if (control.controls.promoCode.value === '' && control.controls.how.value === '') { valid = false; }
  if (control.controls.how.value === 'Other' && control.controls.howOther.value === '') { valid = false; }
  if (control.controls.terms.value === false ||
       control.controls.terms.value === null ||
        control.controls.terms.value === '') { valid = false; }

  // Return null if valid, else a ValidationErrors object
  return valid ? null : { invalid , 'The form is invalid' : false};
};



