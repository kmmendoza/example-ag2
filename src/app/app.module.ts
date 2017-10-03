import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
//routing 
import {appRoutes} from './app.routes';
//guards
import {CanActivateGuardGuard} from './login/can-activate-guard.guard';
//services
import { StompService } from 'ng2-stomp-service';
import { BackendHttpService } from './services/backend-httpservice.service';
import { LoginService } from './login/login-service.service';
//Directives

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './chat/home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';



//Function providing Auth 
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}


//module
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotificationsComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule, NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [StompService, BackendHttpService, LoginService,  CanActivateGuardGuard, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }],
  bootstrap: [AppComponent]
})


export class AppModule { }
