import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  backEndService = 'http://localhost/WalletApp/src/php/';
  constructor(private http: HttpClient) { }

  deleteUser(userData): Observable<any> {
    return this.http.post<any>(this.backEndService + 'delete_user.php', userData, {responseType: 'json'});
  }
}
