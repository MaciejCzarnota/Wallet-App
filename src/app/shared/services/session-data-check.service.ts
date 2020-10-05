import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SessionManagerService } from './session-manager.service';
@Injectable({
  providedIn: 'root'
})
export class SessionDataCheckService {

  backEndService = 'http://localhost/WalletApp/src/php/';
  constructor(private http: HttpClient,
              private sessionManagerService: SessionManagerService) { }

  checkData(): void {
    if (this.sessionManagerService.getLoggedIn()) {
      this.http.post<any>(this.backEndService + 'session_data_check.php',
      {userid: this.sessionManagerService.getId(), password: this.sessionManagerService.getPassword()})
      .toPromise().then(answer => {
        if (answer.correctdata === false ) {
          this.sessionManagerService.logout();
        }
      });
    }
  }
}
