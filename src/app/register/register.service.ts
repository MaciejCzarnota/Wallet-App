import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addNewUser(user: {login: string, password: string}): Observable<any> {
    return this.http.post<{isUsernameUsed: boolean}>(this.backEndService + 'register.php', user, { responseType: 'json' });
  }
}
