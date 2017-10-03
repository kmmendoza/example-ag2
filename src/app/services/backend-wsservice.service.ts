import { Injectable } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import {environment} from '../../environments/environment';

@Injectable()
export class BackendWSServiceService {

  private subscription: any;
  private connected: any;
  private stomp: StompService;

  constructor(stomp: StompService) {
    this.stomp = stomp;
    //configuration
    this.stomp.configure({
      host: environment.wsUrl,
      debug: true,
      queue: { 'init': false, 'chats': false, 'notifications': false }
    });
  }

  //start connection
  public connectToSocket(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.stomp.startConnect().then(() => {
        this.stomp.done('init');
         this.connected = true;
        resolve();
      }, () => {
         this.connected = true;
        reject();
      });

    });
  }


  //subscribe to chat
  public subscribeToChatQueue() {
    this.subscription = this.stomp.subscribe('/chats', (data)=>{
        this.stomp.done('chats');
        console.log('received: ' + data);
    });
    // console.log(this.subscription);   
  }

  //subscribe to notificatios
  public subscribeToNotifQueue() {
    this.subscription = this.stomp.subscribe('/notifications', (data)=>{
        this.stomp.done('notifications');
        console.log('received: ' + data);
    });
    // console.log(this.subscription);   
  }

  //send chat message
  public sendMessage(message: String) {
    this.stomp.send('/app/sendChatMessage/1', {
		ipmo: 1,
      message: message,
      fromUserId: 'x',
      toUserId: 'y'
    });
  }

   //send notification
  public sendNotification(notification: String) {
    this.stomp.send('/app/sendNotification/1', {
      title: 'Title1',
      content: notification,
      user: 'x',
      date: '6-8-2017'
    });
  }

  //response
  public response(data) {
    console.log('received: ' + data);
   
  }
  //check queue status

  public checkQue() {
    this.stomp.after('init').then(() => {     
      this.connected = true;
    }, () => {
      this.connected = false;
    })
  }
  //unsubscribe
  public unsubscribeFromQueue() {
    this.subscription.unsubscribe();
  }

  //disconnect
  public disconnect() {
    this.stomp.disconnect().then(() => {
      console.log('Connection closed');
      this.connected = false;
    })
  }
}
