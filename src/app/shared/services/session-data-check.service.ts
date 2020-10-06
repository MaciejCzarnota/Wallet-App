import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SessionManagerService } from './session-manager.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionDataCheckService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient,
              private sessionManagerService: SessionManagerService) { }

  checkData(): void {
    if (this.sessionManagerService.getLoggedIn()) {
      this.http.post<any>(this.backEndService + 'session_data_check.php',
      {userid: this.sessionManagerService.getId(), password: this.sessionManagerService.getPassword()})
      .subscribe(answer => {
        if (answer.correctdata === false ) {
          this.sessionManagerService.logout();
        }
      });
    }
  }
}
