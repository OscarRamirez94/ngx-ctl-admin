import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { ProfessionI } from '../../interfaces/profession-i';
import { Person } from '../../models/person/person';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CommonService<Person>  {
  protected url = AppSettings.API_ENDPOINT+'/person/';
  //urlprofe esta la saco sel sawwer verdad?
  private urlProfession = AppSettings.API_ENDPOINT+'/profession/';
  constructor(http: HttpClient) {
    super(http);
  }
  //objet Profesion
  getAllProfessions(): Observable<ProfessionI[]> {
    return this.http.get<ProfessionI[]>(this.urlProfession.concat("all"));
  }

}
