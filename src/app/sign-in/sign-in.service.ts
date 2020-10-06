import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loginAttempt(signInData: {login: string, password: string}): Observable<any> {
    return this.http.post<any>(this.backEndService + 'login.php', signInData, { responseType: 'json' });
  }
}
