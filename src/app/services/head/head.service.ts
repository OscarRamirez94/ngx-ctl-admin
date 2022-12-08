import { EventEmitter, Injectable, Output } from '@angular/core';

import { Client } from '../../models/client';
import { Notification } from '../../models/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class HeadService {

  @Output() disparadorClient : EventEmitter<string> = new EventEmitter();
  //@Output() disparadorClientComp : EventEmitter<Notification> = new EventEmitter();
  @Output() disparadorClients : EventEmitter<Boolean> = new EventEmitter();
  constructor() { }
/*
  saveClientLS(clientName:any){
    localStorage.setItem('clientName', clientName);
  }

  getClientLS() :any {
    return localStorage.getItem('clientName');
  }
*/

  saveClient(cliente:string){
    localStorage.setItem('cid', cliente);
  }

  getClientLS() :any {
    return localStorage.getItem('cid');
  }

  saveNameClient(cliente:string){
    localStorage.setItem('cn', cliente);
  }

  getNameClientLS() :any {
    return localStorage.getItem('cn');
  }

}
