import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { SessionManagerService } from '../../shared/services/session-manager.service';
import { SessionMessageManagerService } from '../../shared/services/session-message-manager.service';
import { RedirectManagerService } from '../../shared/services/redirect-manager.service';
import { PasswordChangeService } from './password-change.service';
import { passwordValidator } from '../../shared/directives/validate-password.directive';
import { MESSAGES } from './messages';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  passwordChangeForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword1: new FormControl('', [passwordValidator(),
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)]),
    newPassword2: new FormControl('', [passwordValidator(),
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)])
  });
  isButtonClicked: boolean;
  notSamePasswordWarning: boolean;
  notSameOldAndNewPasswordWarning: boolean;
  wrongOldPasswordWarning: boolean;
  messages = MESSAGES;

  constructor(private sessionManagerService: SessionManagerService,
              private redirectManagerService: RedirectManagerService,
              private passwordChangeService: PasswordChangeService,
              private sessionMessageManagerService: SessionMessageManagerService) {
                this.isButtonClicked = false;
                this.clearWarnings();
  }


  ngOnInit(): void {
    this.redirectManagerService.redirectIfNotLoggedIn();
  }

  clearWarnings(): void {
    this.wrongOldPasswordWarning = false;
    this.notSamePasswordWarning = false;
    this.notSameOldAndNewPasswordWarning = false;
  }

  changePassword(): void {
    this.clearWarnings();
    if (this.checkIfSamePassword() && this.validation() && this.checkIfNewPasswordAndOldPasswordDiffer()) {
      this.passwordChangeService.changePassword({
        user_id: this.sessionManagerService.getId(),
        current_password: this.currentPassword.value,
        new_password: this.newPassword1.value
      }).subscribe(answer => {
        if (answer.success) {
          this.sessionManagerService.login(answer.userid, answer.password);
          this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage(6, '/walletlist');
        }else {
          this.isButtonClicked = true;
          this.wrongOldPasswordWarning = true;
        }
      });
    }else {
      this.isButtonClicked = true;
    }
  }

  validation(): boolean {
    return (!this.newPassword1.errors.required && !this.newPassword1.errors.minlength &&
           !this.newPassword1.errors.maxlength && this.newPassword1.errors.passwordValidation &&
           !this.newPassword2.errors.required && !this.newPassword2.errors.minlength &&
           !this.newPassword2.errors.maxlength && this.newPassword2.errors.passwordValidation);
  }

  checkIfSamePassword(): boolean {
    this.notSamePasswordWarning = Boolean(this.newPassword1.value !== this.newPassword2.value);
    return !this.notSamePasswordWarning;
  }

  checkIfNewPasswordAndOldPasswordDiffer(): boolean {
    if (this.newPassword1.value === this.newPassword2.value)  {
      if (this.newPassword1.value === this.currentPassword.value) {
        this.notSameOldAndNewPasswordWarning = true;
      }else {
        this.notSameOldAndNewPasswordWarning = false;
      }
      return !this.notSameOldAndNewPasswordWarning;
    }else {
      this.notSameOldAndNewPasswordWarning = false;
      return this.notSameOldAndNewPasswordWarning;
    }
  }

  get currentPassword(): AbstractControl { return this.passwordChangeForm.get('currentPassword'); }

  get newPassword1(): AbstractControl { return this.passwordChangeForm.get('newPassword1'); }

  get newPassword2(): AbstractControl { return this.passwordChangeForm.get('newPassword2'); }

}
