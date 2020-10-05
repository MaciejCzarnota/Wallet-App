import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AsideMenuComponent } from './shared/components/aside-menu/aside-menu.component';
import { PageContentComponent } from './shared/components/page-content/page-content.component';
import { SessionManagerService } from './shared/services/session-manager.service';
import { CountriesService } from './shared/services/countries.service';
import { DatabaseLoggerService } from './shared/services/database-logger.service';
import { RedirectComponent } from './redirect/redirect.component';
import { SharedModule } from './shared/shared.module';
import { Pagenotfound404Component } from './pagenotfound404/pagenotfound404.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideMenuComponent,
    PageContentComponent,
    RedirectComponent,
    Pagenotfound404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    SessionManagerService,
    CountriesService,
    DatabaseLoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
