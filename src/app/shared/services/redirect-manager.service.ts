import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SessionManagerService } from './session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectManagerService {

  constructor(private router: Router,
              private sessionManagerService: SessionManagerService) {
     }

  redirect(path: string): void {
      this.router.navigate([path]);
  }

  redirectIfNotLoggedIn(): void {
    if (!this.sessionManagerService.getLoggedIn()) {
      this.redirect('/login');
    }
  }

  redirectIfLoggedIn(): void {
    if (this.sessionManagerService.getLoggedIn()) {
      this.redirect('/walletlist');
    }
  }

  redirectEveryOtherPage(): void {
    this.redirectIfLoggedIn();
    this.redirectIfNotLoggedIn();
  }
}
