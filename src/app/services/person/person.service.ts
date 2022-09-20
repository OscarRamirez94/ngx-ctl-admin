import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professionl } from '../../interfaces/profession-i';
import { Person } from '../../models/person/person';
import { Profession } from '../../models/profession/profession';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CommonService<Person>  {
  protected url = 'http://localhost:8081/microservice-ctl/person/';
  //urlprofe esta la saco sel sawwer verdad?
  private urlProfession = 'http://localhost:8081/microservice-ctl/profession/';
  constructor(http: HttpClient) {
    super(http);
  }
  //objet Profesion
  getAllProfessions(): Observable<Professionl[]> {
    return this.http.get<Professionl[]>(this.urlProfession.concat("all"));
  }

}
