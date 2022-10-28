import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportType } from '../../models/transport_type/transport-type';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class TransportTypeService extends CommonService<TransportType>{

  protected url = 'http://localhost:8081/microservice-ctl/transport-type/';
  protected urlCapacity = 'http://localhost:8081/microservice-ctl/transport-capacity/';
  constructor(http: HttpClient) {
    super(http);
  }

  public eliminarCapacity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlCapacity}${id}`);
  }
}
