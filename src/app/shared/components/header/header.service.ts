import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  dbConnURL = 'http://localhost/WalletApp/src/php/get_username.php';
  constructor(private http: HttpClient) { }

  getUsernameFromServer(userid: number): Observable<any> {
    return this.http.post<any>(this.dbConnURL, {userid}, {responseType: 'json'}).pipe(
      // TODO - obsługa błędu (catchError)
    );
  }
}
