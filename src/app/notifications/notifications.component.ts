import { Component, OnInit } from '@angular/core';
import { BackendWSServiceService } from '../services/backend-wsservice.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
   providers: [BackendWSServiceService]
})
export class NotificationsComponent implements OnInit {
private socket: BackendWSServiceService;

  constructor(socket: BackendWSServiceService) { 
       this.socket = socket;
  }

  ngOnInit() {

    this.socket.connectToSocket().then(() => {
      this.socket.subscribeToNotifQueue();     
      this.socket.sendNotification('notification test');
    });
     
  }

}
