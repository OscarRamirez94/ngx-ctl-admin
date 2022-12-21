import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { CheckOut } from '../../models/check-out/check-out';

@Injectable({
  providedIn: 'root'
})
export class ReportService  {
  private url = AppSettings.API_ENDPOINT+'/report-out/';

  constructor(private http: HttpClient) {

  }

  generateReport(e: CheckOut) {
    return this.http.post(this.url + "report", e,{ responseType: "blob" });
  }

  getPieChart(): Observable<any[]> {
    return this.http.get<any[]>(this.url.concat("pie-chart"));
  }

  getProductChart(client:string): Observable<any[]> {
    return this.http.get<any[]>(this.url.concat("product-chart/",client));
  }

  getTransportChart(client:string): Observable<any[]> {
    return this.http.get<any[]>(this.url.concat("transport-chart/",client));
  }

  getListTopChart(client:string): Observable<any[]> {
    return this.http.get<any[]>(this.url.concat("top-chart/",client));
  }

  downloadReportIn(client:string) {
    return this.http.get(this.url.concat("excel/",client),{ responseType: "blob" });
  }

  downloadReportDate(client:string,dateBefore:string, dateAfter:string) {
    return this.http.get(this.url.concat("excel/",client,"/",dateBefore,"/",dateAfter),{ responseType: "blob" });
  }
}
