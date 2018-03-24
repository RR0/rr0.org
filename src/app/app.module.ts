import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './nav/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NavModule} from './nav/nav.module';
import {AppComponent} from './app.component';


@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, NavModule/*, TimeModule, LangModule*/],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
