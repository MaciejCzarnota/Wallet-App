import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  backEndService = 'http://localhost/WalletApp/src/php/';
  constructor(private http: HttpClient) { }

  getObs(): Observable<any> {
    return this.http.get(this.backEndService + 'get_countries.php');
  }
}
