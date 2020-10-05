import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SessionManagerService } from '../../shared/services/session-manager.service';
import { SessionMessageManagerService } from '../../shared/services/session-message-manager.service';
import { DeleteUserService } from './delete-user.service';
import { RedirectManagerService } from '../../shared/services/redirect-manager.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent implements OnInit {
  passwordInput = new FormControl();
  wrongPassword: boolean;
  message = {
    title: `Wrong password`,
    content: `You cannot delete your account due to wrong password filled in.`,
    success: false,
    display: true
  };

  constructor(private sessionManagerService: SessionManagerService,
              private sessionMessageManagerService: SessionMessageManagerService,
              private redirectManagerService: RedirectManagerService,
              private deleteUserService: DeleteUserService) {
    this.wrongPassword = false;
  }

  ngOnInit(): void {
    this.redirectManagerService.redirectIfNotLoggedIn();
  }

  delete(): void {
    this.deleteUserService.deleteUser({userid: this.sessionManagerService.getId(),
                                       password: this.passwordInput.value}).subscribe(
      answer => {
        if (answer.success) {
          this.sessionManagerService.logout();
          this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage(4, '/login');
        }else {
          this.wrongPassword = true;
        }
      }
    );
  }


}
