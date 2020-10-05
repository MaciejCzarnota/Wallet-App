import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsideMenuService {

  backEndService = 'http://localhost/WalletApp/src/php/';

  constructor(private http: HttpClient) { }

  getUsernameFromServer(userid: number): Observable<any> {
    return this.http.post<any>(this.backEndService + 'get_username.php', {userid}, {responseType: 'json'}).pipe(
      // TODO - obsługa błędu (catchError)
    );
  }
}
