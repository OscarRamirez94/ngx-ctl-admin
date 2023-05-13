import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { Pallet } from '../../models/pallet/pallet';
import { CommonService } from '../commons.service';
import { UaI } from '../../interfaces/ua-i';

@Injectable({
  providedIn: 'root'
})
export class PalletService extends CommonService<Pallet> {
  protected url = AppSettings.API_ENDPOINT+'/pallet/';


  constructor(http: HttpClient) {
    super(http);
   }
   public totalByCheckList(id: number): Observable<number> {
    return this.http.get<number>(this.url+'total/'+id);
  }

  public validate(e: any): Observable<any> {
    return this.http.post<any>(this.url+'validate', e);
  }

  public addStockPallet(e: any): Observable<any> {
    return this.http.put<any>(this.url+'add-stock/'+e.id, e);
  }

  public removeStockPallet(e: any): Observable<any> {
    return this.http.put<any>(this.url+'remove-stock/'+e.id, e);
  }

  public uploadExcel(uFile: any):Observable<any>{
    return this.http.post<any>(this.url+'upload', uFile);
  }

  public getUasDisponibles(clientName:string): Observable<UaI[]> {
    return this.http.get<UaI[]>(this.url.concat("uas/",clientName));
  }

  public getUasTable(clientName:string,e: any): Observable<any> {
    return this.http.post<any>(this.url+'out/uas/'+clientName, e);
  }
}
