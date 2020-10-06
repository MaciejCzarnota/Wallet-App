import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsernameFromServer(userid: number): Observable<any> {
    return this.http.post<any>(this.backEndService + 'get_username.php', {userid}, {responseType: 'json'});
  }
}
