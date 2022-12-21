import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { CheckOut } from '../../models/check-out/check-out';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService  {
  private url = AppSettings.API_ENDPOINT+'/cotizacion-api/';

  constructor(private http: HttpClient) {

  }


  getAllCotizaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.url.concat("all"));
  }


}
