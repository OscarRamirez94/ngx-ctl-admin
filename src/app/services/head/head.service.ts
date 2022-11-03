import { EventEmitter, Injectable, Output } from '@angular/core';

import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class HeadService {

  @Output() disparadorClient : EventEmitter<string> = new EventEmitter();
  @Output() disparadorClientComp : EventEmitter<Client> = new EventEmitter();
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
