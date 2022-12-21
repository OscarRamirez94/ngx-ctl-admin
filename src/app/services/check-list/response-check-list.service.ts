import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { TransportLineI } from '../../interfaces/transport-line-i';
import { CheckList } from '../../models/check-list/check-list';
import { ResponseCheckList } from '../../models/check-list/response-check-list';
import { Client } from '../../models/client';
import { PalletSave } from '../../models/pallet/pallet-save';
import { Person } from '../../models/person/person';
import { TransportCapacity } from '../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../models/transport_type/transport-type';
import { User } from '../../models/user/user';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseCheckListService extends CommonService<ResponseCheckList> {
  url = AppSettings.API_ENDPOINT+'/check-list/';
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
getById(id:any):Observable<CheckList>{
  return this.http.get<CheckList>(this.url.concat(id));
}


public savePallets(palletSave:PalletSave): Observable<any> {

  return this.http.post<any>(this.urlPallet, palletSave);
}


updateStatus(checkListId:any): Observable<any> {
  return this.http.put<any>(this.url.concat("status/",checkListId),null);
}


}
