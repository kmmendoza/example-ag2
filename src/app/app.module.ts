import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
//services
import { StompService } from 'ng2-stomp-service';
import { BackendHttpService } from './services/backend-httpservice.service';
import { LoginService } from './login/login-service.service';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './chat/home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

//routing
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'chat', component: HomeComponent },
  { path: 'notifications', component: NotificationsComponent }
];

//module
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotificationsComponent,
    SignupComponent,
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
  providers: [StompService, BackendHttpService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
