import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  backEndService = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(this.backEndService + 'get_countries.php');
  }
}
