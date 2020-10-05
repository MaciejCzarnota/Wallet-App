import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { SessionManagerService } from '../shared/services/session-manager.service';
import { WalletService } from './wallet.service';
import { RedirectManagerService } from '../shared/services/redirect-manager.service';
import { Wallet } from './classess/wallet';
import { Currency } from './classess/currency';
import { MESSAGE } from './message';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  walletForm = new FormGroup({
    walletname: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required)
  });
  id: number;
  currencies: Currency[] = new Array();
  walletData: Wallet = new Wallet();
  isChanged: boolean;
  isClicked: boolean;
  message = MESSAGE;

  constructor(private activatedRoute: ActivatedRoute,
              private walletService: WalletService,
              private redirectManagerService: RedirectManagerService,
              private sessionManagerService: SessionManagerService) {
  }

  // Methods performed on initialization of wallet component
  ngOnInit(): void {
    this.redirectManagerService.redirectIfNotLoggedIn();
    this.setProperties();
  }

  // Method which set component properties on initialization.
  setProperties(): void {
    this.currencies = this.walletService.getCurrenciesToWallet();
    this.getWalletId();
    this.isClicked = false;
    this.isChanged = false;
    this.getWalletDataFromServer();
  }

  // Getting id from URL - Not included means that form will be used to create new wallet
  getWalletId(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
  }

  // Method used to set values in wallet form and walletData object
  // It also checks if id used in URL is assigned to user which is logged in
  getWalletDataFromServer(): void {
    if (this.id) {
      this.walletService.getWalletData({userid: this.sessionManagerService.getId(), walletid: this.id}).subscribe(
        answer => {
          if (answer.success) {
            this.walletData.id = this.id;
            this.walletData.name = answer.name;
            this.walletData.amount = answer.amount;
            this.walletData.cur = answer.cur;
            this.walletname.setValue(this.walletData.name);
            this.amount.setValue(this.walletData.amount);
            this.currency.setValue(this.walletData.cur);
          }else {
            this.redirectManagerService.redirect('/');
          }
        }
      );
    }
  }

  // Method which implements sending data from form to service and after that to server
  sendData(): void {
    this.isClicked = true;
    this.isChanged = this.checkIfChanged();
    if (!this.isChanged && this.checkIfEmptyValues()) {
      this.walletService.sendData({
        walletid: this.id,
        userid: this.sessionManagerService.getId(),
        name: this.walletname.value,
        amount: this.amount.value,
        currencyid: this.currency.value
      });
    }
  }

  // Methods used to validate if data in database and form is the same
  checkIfChanged(): boolean {
    if (this.walletname.value === this.walletData.name &&
        this.amount.value === this.walletData.amount &&
        this.currency.value === this.walletData.cur) {
      return true;
    }else {
      return false;
    }
  }

  // Method that checks if any input is not empty
  checkIfEmptyValues(): boolean {
    if (!this.walletname.errors?.required &&
        !this.amount.errors?.required &&
        !this.currency.errors?.required) {
      return true;
    }else {
      return false;
    }
  }

  // Getters of form controls of form group
  get walletname(): AbstractControl { return this.walletForm.get('walletname'); }

  get amount(): AbstractControl { return this.walletForm.get('amount'); }

  get currency(): AbstractControl { return this.walletForm.get('currency'); }

}
