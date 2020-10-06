import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseLoggerService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient) { }

  storeLog(data): Observable<any> {
    return this.http.post<any>(this.backEndService + 'store_log.php', data, {responseType: 'json'});
  }
}
