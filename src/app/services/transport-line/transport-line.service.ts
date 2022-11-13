import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportLine } from '../../models/transport-line/transport-line';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class TransportLineService  extends CommonService<TransportLine> {

  protected url = 'http://localhost:8081/microservice-ctl/transport-line/';

  constructor(http: HttpClient) {
    super(http);
  }
  getAllTLByPartner(id): Observable<TransportLine[]> {
    return this.http.get<TransportLine[]>(this.url.concat("all/partner/",id));
  }
}
