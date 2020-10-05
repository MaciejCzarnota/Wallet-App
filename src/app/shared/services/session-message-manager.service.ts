import { Injectable } from '@angular/core';

import { RedirectManagerService } from './redirect-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SessionMessageManagerService {

  constructor(private redirectManagerService: RedirectManagerService) { }

  storeMessageAndRedirectToAnotherPage(which: number, path?: string): void {
    sessionStorage.setItem('which', String(which));
    if (path) {
      this.redirectManagerService.redirect(path);
    }else {
      location.reload();
    }
  }

  getMessage(): number {
    const which = +sessionStorage.getItem('which');
    sessionStorage.removeItem('which');
    return which;
  }
}
