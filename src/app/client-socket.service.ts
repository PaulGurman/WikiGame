import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSocketService {

  socket: any;

  constructor() {
    this.socket = io('http://localhost:4200/');
   }

  Listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  Emit(eventName: string, data: any) {
    this.socket.Emit(eventName, data);
  }
}
