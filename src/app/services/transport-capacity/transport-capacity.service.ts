import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransportCapacity } from '../../models/transport_capacity/transport-capacity';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class TransportCapacityService extends CommonService<TransportCapacity> {

  protected url = 'http://localhost:8081/microservice-ctl/transport-capacity/';

  constructor(http: HttpClient) {
    super(http);
  }
}
