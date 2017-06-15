import { Injectable } from '@angular/core';
import { TokenService } from 'angular2-auth';
import { BackendHttpService } from '../services/backend-httpservice.service';
import { User } from '../models/user';
import {Router} from '@angular/router';
@Injectable()
export class LoginService {

  private _submittedForm: boolean = false;
  private _sessionUser: User;
  private _errorMessage: any;
  constructor(private backendHttpserviceService: BackendHttpService, private router: Router) {

  }

  get sessionUser(): User {
    return this._sessionUser;
  }

  get submittedForm(): boolean {
    return this._submittedForm
  }

  get errorMessage(): String {
    return this._errorMessage;
  }


  doLogin(email: String, password: String) {
    this._submittedForm = true;
    this._sessionUser = null;
    let user = new User(null, null, email, password, null, null, null);
    this.backendHttpserviceService.doPostRequest('/login', null, user)
      .subscribe(
      data => this.updateUserData(data),
      error => this.updateErrorMsg(error));
  }


  updateUserData(data: any) {   
    let user = <User>data.user;
    console.log(user);
    if (user != null) { 
      this._sessionUser = user;
      this.router.navigate(['/chat']);
     }
  }


  updateErrorMsg(error) {
    this._submittedForm = false;
    this._errorMessage = <any>error;
    console.log(error);
  }

}
