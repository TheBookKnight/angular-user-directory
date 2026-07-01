import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UserListComponent } from './features/user-list/user-list';
import { UserCardComponent } from './features/user-card/user-card';

@NgModule({
  declarations: [App, UserListComponent, UserCardComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideZonelessChangeDetection(),
  ],
  bootstrap: [App],
})
export class AppModule { }
