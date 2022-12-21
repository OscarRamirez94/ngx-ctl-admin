import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { TransportCapacityI } from '../../interfaces/transport-capacity-i';
import { TransportLineI } from '../../interfaces/transport-line-i';
import { TransportTypeI } from '../../interfaces/transport-type-i';
import { UserI } from '../../interfaces/user-i';
import { CheckOut } from '../../models/check-out/check-out';
import { Client } from '../../models/client';
import { PalletSave } from '../../models/pallet/pallet-save';
import { Person } from '../../models/person/person';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService extends CommonService<CheckOut> {

  url = AppSettings.API_ENDPOINT+'/check-out/';
  urlClient = AppSettings.API_ENDPOINT+'/partner/';
  urlTransportLine = AppSettings.API_ENDPOINT+'/transport-line/';
  urlTransportCapacity = AppSettings.API_ENDPOINT+'/transport-capacity/';
  urlTransportType = AppSettings.API_ENDPOINT+'/transport-type/';
  urlPersons = AppSettings.API_ENDPOINT+'/person/';
  urlUsers = AppSettings.API_ENDPOINT+'/users/';
  urlPallet = AppSettings.API_ENDPOINT+'/pallet/';

  constructor(http: HttpClient) {
    super(http);
  }


crear(checkOut: CheckOut): Observable<CheckOut> {
  return this.http.post<CheckOut>(this.url, checkOut);
}

getAllClientes(): Observable<Client[]> {
  return this.http.get<Client[]>(this.urlClient.concat("all"));
}

getAllTransportLines(id): Observable<TransportLineI[]> {
  return this.http.get<TransportLineI[]>(this.urlTransportLine.concat("all/partner/",id));
}

getAllTransportCapacities(id:any): Observable<TransportCapacityI[]> {
  return this.http.get<TransportCapacityI[]>(this.urlTransportCapacity.concat("all/",id));
}

getAllTransportTypes(): Observable<TransportTypeI[]> {
  return this.http.get<TransportTypeI[]>(this.urlTransportType.concat("all"));
}

getAllPersons(): Observable<Person[]> {
  return this.http.get<Person[]>(this.urlPersons.concat("all/"));
}
getAllUsersIsResposible(): Observable<UserI[]> {
  return this.http.get<UserI[]>(this.urlUsers.concat("all/isResponsible"));
}
getById(id:any):Observable<CheckOut>{
  return this.http.get<CheckOut>(this.url.concat(id));
}


public savePallets(palletSave:PalletSave): Observable<any> {

  return this.http.post<any>(this.urlPallet, palletSave);
}


updateStatus(palletSave:any): Observable<any> {
  return this.http.put<any>(`${this.url + 'status/'}${palletSave.id}`, palletSave);
}

 saveOut(pallets:any): Observable<any> {

  return this.http.post<any>(this.url+"save-out", pallets);
}
}
