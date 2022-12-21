import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { TransportLineI } from '../../interfaces/transport-line-i';
import { TransportLine } from '../../models/transport-line/transport-line';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class TransportLineService  extends CommonService<TransportLine> {

  protected url = AppSettings.API_ENDPOINT+'/transport-line/';

  constructor(http: HttpClient) {
    super(http);
  }
  getAllTLByPartner(id): Observable<TransportLineI[]> {
    return this.http.get<TransportLineI[]>(this.url.concat("all/partner/",id));
  }
}
