import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

import { SessionManagerService } from '../shared/services/session-manager.service';
import { DatabaseLoggerService } from '../shared/services/database-logger.service';
import { SessionMessageManagerService } from '../shared/services/session-message-manager.service';
import { Currency } from './classess/currency';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  backEndService = environment.apiUrl;

  // Methods performed on initialization of wallet component
  constructor(private http: HttpClient, private router: Router,
              private databaseLoggerService: DatabaseLoggerService,
              private sessionManagerService: SessionManagerService,
              private sessionMessageManagerService: SessionMessageManagerService) { }

  // Method that fetch currencies from database
  getCurrenciesToWallet(): Currency[] {
    const currencies: Array<Currency> = new Array();
    this.http.get<any>(this.backEndService + 'get_currencies.php', { responseType: 'json'}).subscribe(data => {
      for (const currency of data) {
        currencies.push({
          id: currency.currency_id,
          name: currency.name,
          code: currency.code
        });
      }
    });
    return currencies;
  }

  // Method which return promise including wallet data from database
  getWalletData(data): Observable<any> {
    return this.http.post<any>(this.backEndService + 'get_wallet_data.php', data, {responseType: 'json'});
  }

  // Method which send data from form and send it to database
  sendData(walletData): void {
    if (walletData.walletid) {
      forkJoin([
        this.http.post<any>(this.backEndService + 'set_wallet.php', walletData, { responseType: 'json' }),
        this.databaseLoggerService.storeLog({user_id: this.sessionManagerService.getId(), information: `Wallet ${walletData.name} was edited.`})
      ]).subscribe(answer => {
        if (answer[0].success) {
          this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage
            (2, 'walletlist');
        }
      });
    }else {
      forkJoin([
        this.http.post<any>(this.backEndService + 'set_wallet.php', walletData, { responseType: 'json' }),
        this.databaseLoggerService.storeLog({user_id: this.sessionManagerService.getId(), information: `Wallet ${walletData.name} was created.`})
      ]).subscribe(answer => {
        if (answer[0].success) {
          this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage
            (3, 'walletlist');
        }
      });
    }
  }
}
