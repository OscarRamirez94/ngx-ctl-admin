import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckOutDetail } from '../../models/check-out-detail/check-out-detail';
import { CommonService } from '../commons.service';


@Injectable({
  providedIn: 'root'
})
export class CheckOutDeatailService extends CommonService<CheckOutDetail> {

  url = 'http://localhost:8081/microservice-ctl/check-out-detail/';

  constructor(http: HttpClient) {
    super(http);
  }


crear(checkOutDetail: any): Observable<CheckOutDetail> {
  console.log("service",checkOutDetail)
  return this.http.post<CheckOutDetail>(this.url, checkOutDetail);
}

delete(detailId,palletId): Observable<any> {
  return this.http.delete<CheckOutDetail>(this.url.concat('detail/',detailId,'/pallet/',palletId));
}



}