import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { WalletService } from './wallet.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [WalletComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    WalletService
  ]
})
export class WalletModule { }
