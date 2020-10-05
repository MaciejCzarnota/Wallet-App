import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {

  backEndService = 'http://localhost/WalletApp/src/php/';

  constructor(private http: HttpClient) { }

  changePassword(user): Observable<any> {
    return this.http.post<any>(this.backEndService + 'change_password.php', user, { responseType: 'json' });
  }
}
