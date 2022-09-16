import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransportType } from '../../models/transport_type/transport-type';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class TransportTypeService extends CommonService<TransportType>{

  protected url = 'http://localhost:8081/microservice-ctl/transport-type/';

  constructor(http: HttpClient) {
    super(http);
  }
}
