import { Injectable } from '@angular/core';
import { BackendHttpService } from '../services/backend-httpservice.service';
import { User } from '../models/user';
import { LoginModel } from './login.model';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginService {

  private _submittedForm: boolean = false;
  private _sessionUser: User;
  private _errorMessage: any;
  constructor(private backendHttpserviceService: BackendHttpService, private router: Router) {

  }

  get sessionUser(): User {
    if (this.checkAuthenticated()) {
      this.getUserDataFromLocalStorage();
    }

    return this._sessionUser;
  }

  get submittedForm(): boolean {
    return this._submittedForm
  }

  get errorMessage(): String {
    return this._errorMessage;
  }

  doTest() {
    this.backendHttpserviceService.doPostRequest('/test', null, {}).subscribe(
      data => console.log(data),
      error => console.log(error));
  }


  doLogin(loginModel: LoginModel) {
    this._submittedForm = true;
    this._sessionUser = null;
    this._errorMessage = null;
    let dataCreds = { "email": loginModel.email, "password": loginModel.password };
    this.backendHttpserviceService.doPostLogin('/login', null, dataCreds).subscribe(
      data => this.setUserDataToLocalStorage(data),
      error => this.updateErrorMsg(error));
  }


  setUserDataToLocalStorage(loginResponse: any) {

    let authHeaders = loginResponse.headers;
    let authToken = authHeaders.get('authorization');
    if (authToken) {
      //Store the token
      localStorage.setItem('token', authToken);
      this.router.navigate(['/chat']);
    }

  }


  getUserDataFromLocalStorage() {
    //Update logged user data
    let jwtHelper = new JwtHelper();
    let authToken = localStorage.getItem('token');
    if (authToken) {
      let decodedToken = jwtHelper.decodeToken(authToken);
      if (decodedToken) {
        this._sessionUser = new User(decodedToken.id, decodedToken.username, decodedToken.sub, 'password',
          decodedToken.firstname, decodedToken.lastname, decodedToken.status);
      }
    }

  }

  updateErrorMsg(error) {
    this._sessionUser = null;
    this._submittedForm = true;

    if (error.status == 401) {
      this._errorMessage = 'Check your credentials...';
    } else if (error.status < 200 || error.status > 300) {
      this._errorMessage = 'Problems with app server conections, contact administrator...';
    } else {
      this._errorMessage = 'Error, contact administrator: ' + error.toString();
    }
  }

  checkAuthenticated() {
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    if (!tokenNotExpired()) {
      return false;
    }
    return true;
  }

  doLogout() {
    localStorage.removeItem('token');
  }



}
