import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  backEndService = 'http://localhost/WalletApp/src/php/';
  constructor(private http: HttpClient) { }

  getHistory(userData): Observable<any> {
    return this.http.post<any>(this.backEndService + 'get_user_history.php', userData, {responseType: 'json'});
  }
}
