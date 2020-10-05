import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  backEndService = 'http://localhost/WalletApp/src/php/';

  constructor(private http: HttpClient) { }

  getUserData(userid): Observable<any> {
    return this.http.post<any>(this.backEndService + 'get_user_data.php', userid, { responseType: 'json' });
  }

  setUserData(user): Observable<any> {
    return this.http.post<any>(this.backEndService + 'set_user_data.php', user, { responseType: 'json' });
  }
}
