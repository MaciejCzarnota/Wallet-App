import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserDataRoutingModule } from './user-data-routing.module';
import { UserDataComponent } from './user-data.component';
import { UserDataService } from './user-data.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { HistoryComponent } from './history/history.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserDataComponent, DeleteUserComponent, HistoryComponent, PasswordChangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserDataRoutingModule,
    SharedModule
  ],
  providers: [
    UserDataService
  ]
})
export class UserDataModule { }
