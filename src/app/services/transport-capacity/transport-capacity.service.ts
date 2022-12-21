import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { TransportTypeI } from '../../interfaces/transport-type-i';
import { TransportCapacity } from '../../models/transport_capacity/transport-capacity';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class TransportCapacityService extends CommonService<TransportCapacity> {

  protected url = AppSettings.API_ENDPOINT+'/transport-capacity/';
  private urlTransportType = AppSettings.API_ENDPOINT+'/transport-type/';
  constructor(http: HttpClient) {
    super(http);
  }

  getAllTransportType(): Observable<TransportTypeI[]> {
    return this.http.get<TransportTypeI[]>(this.urlTransportType.concat("all"));
  }


}
