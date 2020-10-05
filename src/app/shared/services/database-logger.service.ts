import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseLoggerService {

  backEndService = 'http://localhost/WalletApp/src/php/';

  constructor(private http: HttpClient) { }

  storeLog(data): Observable<any> {
    return this.http.post<any>(this.backEndService + 'store_log.php', data, {responseType: 'json'});
  } 
}
