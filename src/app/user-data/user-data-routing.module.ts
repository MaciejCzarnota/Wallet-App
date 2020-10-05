import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDataComponent } from './user-data.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { HistoryComponent } from './history/history.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

const routes: Routes = [
  {
    path: 'edit',
    component: UserDataComponent
  },
  {
    path: 'delete',
    component: DeleteUserComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'passwordchange',
    component: PasswordChangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDataRoutingModule { }
