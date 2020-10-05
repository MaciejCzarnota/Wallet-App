import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WalletListRoutingModule } from './wallet-list-routing.module';
import { WalletListComponent } from './wallet-list.component';
import { WalletListService } from './wallet-list.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [WalletListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WalletListRoutingModule,
    SharedModule
  ],
  providers: [
    WalletListService
  ]
})
export class WalletListModule { }
