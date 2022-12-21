import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { ResponsePrefix } from '../../interfaces/ResponsePrefix';

import { Client } from '../../models/client';
import { CommonService } from '../commons.service';



@Injectable({
  providedIn: 'root'
})
export class ClientService extends CommonService<Client> {
 protected url = AppSettings.API_ENDPOINT+'/partner/';

 constructor(http: HttpClient) {
  super(http);
 }
 public crearConFoto(alumno: Client, archivo: File): Observable<Client>{
  const formData = new FormData();
  formData.append('archivo', archivo);
  formData.append('nombre', alumno.name);

  return this.http.post<Client>(this.url + '/crear-con-foto',
   formData);
}

public editarConFoto(alumno: Client, archivo: File): Observable<Client>{
 const formData = new FormData();
 formData.append('archivo', archivo);
 formData.append('nombre', alumno.name);

 return this.http.put<Client>(`${this.url}/editar-con-foto/${alumno.id}`,
  formData);
}


getClientByPrefix(partnerId:string):Observable<ResponsePrefix>{
   return this.http.get<ResponsePrefix>(this.url.concat("prefix/",partnerId));
}



}
