import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login-service.service';
import { BackendWSServiceService } from '../../services/backend-wsservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BackendWSServiceService]
})
export class HomeComponent implements OnInit {  

  private usersList = [{ nickName: 'ninck1' },
   {nickName:'nick2'},
    {nickName:'nick3'},
    {nickName:'nick4'},
    {nickName:'nick5'},
    {nickName:'nick6'}];

  constructor(private socket: BackendWSServiceService, private loginService: LoginService) {    

  }

  ngOnInit() {
console.log(this.loginService.sessionUser);
    this.socket.connectToSocket().then(() => {
      this.socket.subscribeToChatQueue();     
      this.socket.sendMessage('Holaaa back');
    });
   
  }

}
