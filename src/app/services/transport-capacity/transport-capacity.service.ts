import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportTypeI } from '../../interfaces/transport-type-i';
import { TransportCapacity } from '../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../models/transport_type/transport-type';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class TransportCapacityService extends CommonService<TransportCapacity> {

  protected url = 'http://localhost:8081/microservice-ctl/transport-capacity/';
  private urlTransportType = 'http://localhost:8081/microservice-ctl/transport-type/';
  constructor(http: HttpClient) {
    super(http);
  }

  getAllTransportType(): Observable<TransportTypeI[]> {
    return this.http.get<TransportTypeI[]>(this.urlTransportType.concat("all"));
  }


}
