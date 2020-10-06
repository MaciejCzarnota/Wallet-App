import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient) { }

  deleteUser(userData): Observable<any> {
    return this.http.post<any>(this.backEndService + 'delete_user.php', userData, {responseType: 'json'});
  }
}
