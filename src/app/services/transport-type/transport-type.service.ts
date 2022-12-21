import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { TransportType } from '../../models/transport_type/transport-type';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class TransportTypeService extends CommonService<TransportType>{

  protected url = AppSettings.API_ENDPOINT+'/transport-type/';
  protected urlCapacity = AppSettings.API_ENDPOINT+'/transport-capacity/';
  constructor(http: HttpClient) {
    super(http);
  }

  public eliminarCapacity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlCapacity}${id}`);
  }
}
