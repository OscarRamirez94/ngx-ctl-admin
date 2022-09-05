import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../models/client';
import { CommonService } from '../commons.service';



@Injectable({
  providedIn: 'root'
})
export class ClientService extends CommonService<Client> {
 protected url = 'http://localhost:8081/microservice-ctl/partner/all';
 constructor(http: HttpClient) {
  super(http);
 }
}
