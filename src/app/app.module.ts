import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {OwlModule} from 'ngx-owl-carousel';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './templates/header/header.component';
import {FooterComponent} from './templates/footer/footer.component';
import {HomeComponent} from './home/home.component';
import {SliderComponent} from './templates/slider/slider.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {PwaInstallComponent} from './templates/pwa-install/pwa-install.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    PwaInstallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OwlModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
  ],
  // 請把我註冊在這整個 NgModule 都用同一個實體的注射器裡
  // 整個 NgModule 裡都會使用同一個實體
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})

export class AppModule {
}
