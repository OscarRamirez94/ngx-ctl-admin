import { EventEmitter, Injectable, Output } from '@angular/core';

import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class HeadService {

  @Output() disparadorClient : EventEmitter<string> = new EventEmitter();
  constructor() { }

  saveClientLS(clientName:any){
    localStorage.setItem('clientName', clientName);
  }

  getClientLS() :any {
    return localStorage.getItem('clientName');
  }
}
