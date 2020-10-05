import { Component, OnInit } from '@angular/core';

import { HeaderService } from './header.service';
import { SessionManagerService } from '../../services/session-manager.service';
import { Router } from '@angular/router';
import { SessionMessageManagerService } from '../../services/session-message-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  username: string;
  constructor(private headerService: HeaderService,
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

  getUsername(): void {
    if (this.isLogged) {
    // TODO przypisać do wartości username nazwę użytkownika zalogowanego
    this.headerService.getUsernameFromServer(this.sessionManagerService.getId()).subscribe(data =>
      this.username = data.username
    );
  }}

  logout(): void {
    this.sessionManagerService.logout();
    this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage(3, '/login');
  }



  ngOnInit(): void {

  }

}
