import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletListComponent } from './wallet-list.component';

const routes: Routes = [
  {
    path: '',
    component: WalletListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletListRoutingModule { }
