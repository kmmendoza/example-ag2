import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../login.model';
import { LoginService } from '../login-service.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model = new LoginModel('', '');

  constructor(private loginService: LoginService) {

  }

  doLogin() {
    this.loginService.doLogin(this.model.email, this.model.password);
  }

  ngOnInit() {
  }

}
