import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SessionManagerService } from '../shared/services/session-manager.service';
import { WalletListService } from './wallet-list.service';
import { DatabaseLoggerService } from '../shared/services/database-logger.service';
import { RedirectManagerService } from '../shared/services/redirect-manager.service';
import { SessionMessageManagerService } from '../shared/services/session-message-manager.service';
import { MESSAGES } from './messages';

class Wallet {
  id: number;
  name: string;
  amount: number;
  cur: string;
  depositDisplay: boolean;
  withdrawalDisplay: boolean;
  depositControl: FormControl;
  withdrawalControl: FormControl;
}

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {

  wallets: Wallet[] = new Array();
  successData: {title: string, content: string, display: boolean, success: boolean};
  display: Array<boolean> = new Array();
  messages = MESSAGES;

  constructor(private walletListService: WalletListService,
              private databaseLoggerService: DatabaseLoggerService,
              private redirectManagerService: RedirectManagerService,
              private sessionManagerService: SessionManagerService,
              private sessionMessageManagerService: SessionMessageManagerService) {
    this.fillInWalletArray();
    this.getMessage();
  }

  ngOnInit(): void {
    this.redirectManagerService.redirectIfNotLoggedIn();
  }

  clearMessageArray(): void {
    for (let i = 0; i < this.messages.length; i++) {
      this.display[i] = false;
    }
  }

  getMessage(): void {
    this.clearMessageArray();
    const which = this.sessionMessageManagerService.getMessage();
    if (which) {
      this.display[which - 1] = true;
    }
  }

  fillInWalletArray(): void {
    this.walletListService.getWalletList({userid: this.sessionManagerService.getId()}).
      subscribe(value => {
        for (const wallet of value) {
          this.wallets.push({id: wallet.id,
            name: wallet.name,
            amount: wallet.amount,
            cur: wallet.cur,
            depositDisplay: false,
            withdrawalDisplay: false,
            depositControl: new FormControl(''),
            withdrawalControl: new FormControl('')
          });
        }
      }
    );
  }

  depositToggle(id: number): void {
    for (const wallet of this.wallets) {
      if (wallet.id === id) {
        wallet.depositDisplay = !wallet.depositDisplay;
      }
    }
  }

  deposit(id, depositControl, name): void {
    this.walletListService.changeWalletAmount({userid: this.sessionManagerService.getId(),
                                              walletid: id, amount: depositControl.value}).subscribe(
      data => {
        if (data.success) {
          for (const wallet of this.wallets) {
            if (wallet.id === id) {
              this.databaseLoggerService.storeLog({user_id: this.sessionManagerService.getId(), information: `Wallet ${name} amount was edited.`})
                .subscribe();
              wallet.amount = +wallet.amount + depositControl.value;
            }
          }
        }
      }
    );
  }

  withdrawalToggle(id: number): void {
    for (const wallet of this.wallets) {
      if (wallet.id === id) {
        wallet.withdrawalDisplay = !wallet.withdrawalDisplay;
      }
    }
    console.log(this.wallets);
    console.log(id);
  }

  withdraw(id, amount, depositControl, name): void {
    if (amount > depositControl.value) {
      this.walletListService.changeWalletAmount({userid: this.sessionManagerService.getId(),
                                              walletid: id, amount: -depositControl.value}).subscribe(
      data => {
        if (data.success) {
          for (const wallet of this.wallets) {
            if (wallet.id === id) {
              wallet.amount = +wallet.amount - depositControl.value;
              this.databaseLoggerService.storeLog({user_id: this.sessionManagerService.getId(), information: `Wallet ${name} amount was edited.`})
                .subscribe();
            }
          }
        }
      });
    }else {
      for (const wallet of this.wallets) {
        if (wallet.id === id) {
          this.clearMessageArray();
          this.display[4] = true;
        }
      }
    }
  }

  deleteWallet(id: number, name: string): void {
    for (let i = 0; i < this.wallets.length; i++) {
      if ( this.wallets[i].id === id) {
        this.wallets.splice(i, 1);
        this.walletListService.deleteWallet({userid: this.sessionManagerService.getId(), walletid: id});
      }
    }

  }

}
