import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckList } from '../../models/check-list/check-list';
import { Client } from '../../models/client';
import { Pallet } from '../../models/pallet/pallet';
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
export class PalletService extends CommonService<Pallet> {
  protected url = 'http://localhost:8081/microservice-ctl/pallet/';


  constructor(http: HttpClient) {
    super(http);
   }
   public totalByCheckList(id: number): Observable<number> {
    return this.http.get<number>(this.url+'total/'+id);
  }

  public validate(e: any): Observable<any> {
    return this.http.post<any>(this.url+'validate', e);
  }
}
