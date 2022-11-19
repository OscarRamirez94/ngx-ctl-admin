import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckOut } from '../../models/check-out/check-out';

@Injectable({
  providedIn: 'root'
})
export class ReportService  {
  private url = 'http://localhost:8081/microservice-ctl/report-out/';

  constructor(private http: HttpClient) {

  }

  generateReport(e: CheckOut) {
    return this.http.post(this.url + "report", e,{ responseType: "blob" });
  }

  getPieChart(): Observable<any[]> {
    return this.http.get<any[]>(this.url.concat("pie-chart"));
  }


}
