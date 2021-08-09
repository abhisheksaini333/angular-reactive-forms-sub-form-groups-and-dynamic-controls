import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-reactive-forms-demo';
  submitted = false;

  registerForm: FormGroup = this._formBuilder.group({});


  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.min(18)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      // addressGroup: this._formBuilder.group({
      //   door: ['', Validators.required],
      //   street: ['', Validators.required],
      //   city: ['', Validators.required],
      //   state: ['', Validators.required],
      //   areaCode: ['', Validators.required],
      // })
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    })

    setTimeout(() => {
      this.setDefaultValues();
    }, 2000)
  }

  mustMatch(password: string, confirmPassword: string) {
    // return error yes or no, password === confirmPassword
    return (formGroup: FormGroup) => {
      const pwd = formGroup.controls[password];
      const cnfPwd = formGroup.controls[confirmPassword];
      const existingErrors = cnfPwd.errors;

      if (pwd.value !== cnfPwd.value) {
        cnfPwd.setErrors({
          ...existingErrors,
          mustMatch: true
        })
      } else {
        cnfPwd.setErrors({
          ...existingErrors,
          mustMatch: false
        });
      }
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  get fA() {
    return this.registerForm.controls.addressGroup;
  }

  onFormSubmit() {
    debugger
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // save the data to the BE, make an API call
    console.log(JSON.stringify(this.registerForm.value));
  }

  setDefaultValues() {
    this.registerForm.setValue({
      title: "Mr",
      firstName: 'Abhishek',
      lastName: "Saini",
      dob: formatDate(new Date('1900-09-07'), 'yyyy-MM-dd', 'en'),
      email: 'abhishek_saini@live.com',
      password: '12345678',
      confirmPassword: '12345678',
      age: 21
    })
  }

  patchTheValue() {
    this.registerForm.patchValue({
      firstName: 'Amandeep',
      lastName: "Singh"
    })
  }

  resetForm() {
    this.registerForm.reset();
  }

  setValidationOnAge() {
    this.registerForm.controls['age'].setValidators(Validators.requiredTrue);
  }

  removeValidationOnAge() {
    this.registerForm.controls['age'].clearValidators();
  }


}
