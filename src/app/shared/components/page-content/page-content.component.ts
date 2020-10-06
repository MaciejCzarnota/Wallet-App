import { Component, OnInit } from '@angular/core';

import { SessionManagerService } from '../../services/session-manager.service';
import { SessionDataCheckService } from '../../services/session-data-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-content',
  template: `
<div [class.logged]="isLogged" [class.notLogged]="!isLogged">
  <router-outlet></router-outlet>
</div>
  `,
  styles: [`
  .logged {
    float: left;
    position: relative;
  }
  .notLogged {
    position: relative;
  }
  @media only screen and (max-width: 700px) {
    .logged {
      width: 100%;
    }
  }
  @media only screen and (min-width: 700px) {
    .logged {
      left: calc(20% + 1px);
      width: calc(80% - 1px);
    }
  }

  @media only screen and (min-width: 500px) {
    div {
      top: 40px;
    }
  }
`]
})
export class PageContentComponent implements OnInit {

  isLogged: boolean;

  constructor(private sessionManagerService: SessionManagerService,
              private sessionDataCheckService: SessionDataCheckService,
              private router: Router) {
    this.router.events.subscribe(() => {
      this.getIsLogged();
    });
  }

  ngOnInit(): void {
    this.sessionDataCheckService.checkData();
  }

  getIsLogged(): void {
    this.isLogged = this.sessionManagerService.getLoggedIn();
  }



}
