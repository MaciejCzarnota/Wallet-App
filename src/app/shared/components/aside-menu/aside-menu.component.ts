import { Component, OnChanges } from '@angular/core';

import { AsideMenuService } from './aside-menu.service';
import { SessionManagerService } from '../../services/session-manager.service';
import { SessionMessageManagerService } from '../../services/session-message-manager.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent implements OnChanges {

  isLogged: boolean;
  username: string;
  constructor(private asideMenuService: AsideMenuService,
              private sessionManagerService: SessionManagerService,
              private sessionMessageManagerService: SessionMessageManagerService,
              private router: Router) {
    this.router.events.subscribe(() => {
      this.getIsLogged();
      this.getUsername();
    });
  }

  getIsLogged(): void {
    this.isLogged = this.sessionManagerService.getLoggedIn();
  }

  ngOnChanges(): void {
    this.getIsLogged();
  }

  getUsername(): void {
    if (this.isLogged) {
      this.asideMenuService.getUsernameFromServer(this.sessionManagerService.getId()).subscribe(data => {
        this.username = data.username;
      });
    }
  }

  logout(): void {
    this.sessionManagerService.logout();
    this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage(3, '/login');
  }

}
