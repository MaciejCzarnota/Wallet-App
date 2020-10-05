import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';
import { Pagenotfound404Component } from './pagenotfound404/pagenotfound404.component';

const routes: Routes = [
    {
      path: '',
      component: RedirectComponent,
    },
    {
      path: 'login',
      loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule),
    },
    { path: 'user',
      loadChildren: () => import('./user-data/user-data.module').then(m => m.UserDataModule),
    },
    {
      path: 'walletlist',
      loadChildren: () => import('./wallet-list/wallet-list.module').then(m => m.WalletListModule)
    },
    {
      path: 'wallet',
      loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule)
    },
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    },
    {
      path: '**',
      component: Pagenotfound404Component
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
