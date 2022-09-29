import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckList } from '../../models/check-list/check-list';
import { Client } from '../../models/client';
import { Person } from '../../models/person/person';
import { TransportLine } from '../../models/transport-line/transport-line';
import { TransportCapacity } from '../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../models/transport_type/transport-type';
import { AuthRoleService } from '../auth/auth-role.service';

@Injectable({
  providedIn: 'root'
})
export class CheckListService {
  url = 'http://localhost:8081/microservice-ctl/check-list/';
  urlClient = 'http://localhost:8081/microservice-ctl/partner/';
  urlTransportLine = 'http://localhost:8081/microservice-ctl/transport-line/';
  urlTransportCapacity = 'http://localhost:8081/microservice-ctl/transport-capacity/';
  urlTransportType = 'http://localhost:8081/microservice-ctl/transport-type/';
  urlPersons = 'http://localhost:8081/microservice-ctl/person/';
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

getAllTransportCapacities(id:any): Observable<TransportCapacity[]> {
  return this.http.get<TransportCapacity[]>(this.urlTransportCapacity.concat("all/",id));
}

getAllTransportTypes(): Observable<TransportType[]> {
  return this.http.get<TransportType[]>(this.urlTransportType.concat("all"));
}

getAllPersons(): Observable<Person[]> {
  return this.http.get<Person[]>(this.urlPersons.concat("all/"));
}


}
