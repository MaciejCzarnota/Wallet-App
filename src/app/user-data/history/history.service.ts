import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHistory(userData: {userid: number}): Observable<any> {
    return this.http.post<any>(this.backEndService + 'get_user_history.php', userData, {responseType: 'json'});
  }
}
