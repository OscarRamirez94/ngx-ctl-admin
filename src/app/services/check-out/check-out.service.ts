import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportLineI } from '../../interfaces/transport-line-i';
import { CheckList } from '../../models/check-list/check-list';
import { CheckOut } from '../../models/check-out/check-out';
import { Client } from '../../models/client';
import { PalletSave } from '../../models/pallet/pallet-save';
import { Person } from '../../models/person/person';
import { TransportLine } from '../../models/transport-line/transport-line';
import { TransportCapacity } from '../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../models/transport_type/transport-type';
import { User } from '../../models/user/user';
import { AuthRoleService } from '../auth/auth-role.service';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService extends CommonService<CheckOut> {

  url = 'http://localhost:8081/microservice-ctl/check-out/';
  urlClient = 'http://localhost:8081/microservice-ctl/partner/';
  urlTransportLine = 'http://localhost:8081/microservice-ctl/transport-line/';
  urlTransportCapacity = 'http://localhost:8081/microservice-ctl/transport-capacity/';
  urlTransportType = 'http://localhost:8081/microservice-ctl/transport-type/';
  urlPersons = 'http://localhost:8081/microservice-ctl/person/';
  urlUsers = 'http://localhost:8081/microservice-ctl/users/';
  urlPallet = 'http://localhost:8081/microservice-ctl/pallet/';

  constructor(http: HttpClient) {
    super(http);
  }


crear(checkOut: CheckOut): Observable<CheckOut> {
  console.log("service",CheckOut)
  return this.http.post<CheckOut>(this.url, checkOut);
}

getAllClientes(): Observable<Client[]> {
  return this.http.get<Client[]>(this.urlClient.concat("all"));
}

getAllTransportLines(id): Observable<TransportLineI[]> {
  return this.http.get<TransportLineI[]>(this.urlTransportLine.concat("all/partner/",id));
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
getAllUsersIsResposible(): Observable<User[]> {
  return this.http.get<User[]>(this.urlUsers.concat("all/isResponsible"));
}
getById(id:any):Observable<CheckOut>{
  return this.http.get<CheckOut>(this.url.concat(id));
}


public savePallets(palletSave:PalletSave): Observable<any> {
  console.log("service",palletSave)
  return this.http.post<any>(this.urlPallet, palletSave);
}


updateStatus(palletSave:any): Observable<any> {
  return this.http.put<any>(`${this.url + 'status/'}${palletSave.id}`, palletSave);
}

 saveOut(pallets:any): Observable<any> {
  console.log("service",pallets)
  return this.http.post<any>(this.url+"save-out", pallets);
}
}
