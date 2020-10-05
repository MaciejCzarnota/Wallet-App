import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionManagerService } from '../shared/services/session-manager.service';
import { SessionMessageManagerService } from '../shared/services/session-message-manager.service';
import { SignInService } from './sign-in.service';
import { RedirectManagerService } from '../shared/services/redirect-manager.service';
import { MESSAGES } from './messages';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  userLogin = new FormGroup({
    login: new FormControl('', Validators.minLength(3)),
    password: new FormControl('', Validators.minLength(8))
  });
  messages = MESSAGES;
  display: Array<boolean> = new Array();

  constructor(private signInService: SignInService,
              private sessionManagerService: SessionManagerService,
              private redirectManagerService: RedirectManagerService,
              private sessionMessageManagerService: SessionMessageManagerService) {
  }

  ngOnInit(): void {
    this.redirectManagerService.redirectIfLoggedIn();
    this.getSuccessMessage();
  }

  clearMessageArray(): void {
    for (let i = 0; i < this.messages.length; i++) {
      this.display[i] = false;
    }
  }

  getSuccessMessage(): void {
    this.clearMessageArray();
    const which = this.sessionMessageManagerService.getMessage();
    if (which) {
      this.display[which - 1] = true;
    }
  }

  loginAttempt(): void {
    const login = this.userLogin.get('login').value;
    const password = this.userLogin.get('password').value;
    this.signInService.loginAttempt({login, password}).subscribe(answer => {
      if (answer.correctdata) {
        this.sessionManagerService.login(answer.userid, answer.password);
        this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage
          (1, '/walletlist');
      }else {
        this.clearMessageArray();
      }
      this.display[1] = !answer.correctdata;
    });

  }



}
