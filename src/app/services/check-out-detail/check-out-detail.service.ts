import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { CheckOutDetail } from '../../models/check-out-detail/check-out-detail';
import { CheckOutDetailRequest } from '../../models/check-out-detail/check-out-detail-request';
import { CommonService } from '../commons.service';


@Injectable({
  providedIn: 'root'
})
export class CheckOutDeatailService extends CommonService<CheckOutDetail> {

  url = AppSettings.API_ENDPOINT+'/check-out-detail/';

  constructor(http: HttpClient) {
    super(http);
  }


crearDetail(checkOutDetailRequest: CheckOutDetailRequest): Observable<CheckOutDetail> {
  return this.http.post<CheckOutDetail>(this.url, checkOutDetailRequest);
}

delete(detailId,palletId): Observable<any> {
  return this.http.delete<CheckOutDetail>(this.url.concat('detail/',detailId,'/pallet/',palletId));
}



}
