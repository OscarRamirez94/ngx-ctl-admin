import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckList } from '../../models/check-list/check-list';
import { Client } from '../../models/client';
import { TransportLine } from '../../models/transport-line/transport-line';

@Injectable({
  providedIn: 'root'
})
export class CheckListService {
  url = 'http://localhost:8081/microservice-ctl/checklitss/';
  urlClient = 'http://localhost:8081/microservice-ctl/partner/';
  urlTransportLine = 'http://localhost:8081/microservice-ctl/transport-line/';
 constructor(public http: HttpClient) {
 }


 public crear(checkList: CheckList): Observable<any> {
  console.log("service",checkList)
  return this.http.post<any>(this.url, checkList);
}

getAllClientes(): Observable<Client[]> {
  return this.http.get<Client[]>(this.urlClient.concat("all"));
}

getAllTransportLines(): Observable<TransportLine[]> {
  return this.http.get<TransportLine[]>(this.urlTransportLine.concat("all"));
}

}
