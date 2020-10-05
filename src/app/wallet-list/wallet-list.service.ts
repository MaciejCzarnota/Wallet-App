import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DatabaseLoggerService } from '../shared/services/database-logger.service';
import { SessionMessageManagerService } from '../shared/services/session-message-manager.service';

@Injectable({
  providedIn: 'root'
})
export class WalletListService {

  backEndService = 'http://localhost/WalletApp/src/php/';

  constructor(private http: HttpClient,
              private databaseLoggerService: DatabaseLoggerService,
              private sessionMessageManagerService: SessionMessageManagerService) { }

  deleteWallet(data: {userid: number, walletid: number}): void {
    this.http.post<any>(this.backEndService + 'delete_wallet.php', data, {responseType: 'json'}).subscribe(answer => {
      if (answer.success) {
        this.databaseLoggerService.storeLog({user_id: data.userid, information: `Wallet ${name} was deleted.`})
          .subscribe(() => {
            this.sessionMessageManagerService.storeMessageAndRedirectToAnotherPage
              (4);
          }
        );
      }
    });
  }

  changeWalletAmount(data: {userid: number, walletid: number, amount: number}): Observable<any> {
    return this.http.post<any>(this.backEndService + 'change_wallet_amount.php', data, {responseType: 'json'});
  }

  getWalletList(sendData: {userid: number}): Observable<any> {
    return this.http.post<any>(this.backEndService + 'get_wallet_list.php', sendData, {responseType: 'json'});
  }
}
