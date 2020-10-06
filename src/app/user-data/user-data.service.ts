import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserData(userid): Observable<any> {
    return this.http.post<any>(this.backEndService + 'get_user_data.php', userid, { responseType: 'json' });
  }

  setUserData(user): Observable<any> {
    return this.http.post<any>(this.backEndService + 'set_user_data.php', user, { responseType: 'json' });
  }
}
