import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { RegisterService } from './register.service';
import { RedirectManagerService } from '../shared/services/redirect-manager.service';
import { SessionMessageManagerService } from '../shared/services/session-message-manager.service';
import { usernameValidator, passwordValidator } from '../shared/directives/validate-password.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      usernameValidator()
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      passwordValidator()
    ])
  });

  isConfirmed: boolean;
  isUsernameUsed: boolean;

  constructor(private registerService: RegisterService,
              private redirectManagerService: RedirectManagerService,
              private sessionMessageManagerService: SessionMessageManagerService) {
    this.isUsernameUsed = false;
    this.isConfirmed = false;
  }

  ngOnInit(): void {
    this.redirectManagerService.redirectIfLoggedIn();
  }

  createNewUser(): void {
    if (this.checkValidation()) {
        this.isUsernameUsed = false;
        const newUser = {
          login: this.username.value,
          password: this.password.value
        };
        this.registerService.addNewUser(newUser).subscribe(answer => {
          this.isUsernameUsed = answer.isUsernameUsed;
          if (!this.isUsernameUsed) {
            this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage
              (1, 'login');
          }
        });
      }
    this.isConfirmed = true;
  }

  checkValidation(): boolean {
    if (!this.username.errors.required && !this.username.errors.minlength &&
      !this.username.errors.maxlength && this.username.errors.usernameValidation &&
      !this.password.errors.required && !this.password.errors.minlength &&
      !this.password.errors.maxlength && this.password.errors.passwordValidation) {
        return true;
      }else {
        return false;
      }
  }

  get username(): AbstractControl { return this.registerForm.get('username'); }

  get password(): AbstractControl { return this.registerForm.get('password'); }


}
