import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person/person';
import { CommonService } from './commons.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CommonService<Person>  {
  protected url = 'http://localhost:8081/microservice-ctl/person/';

  constructor(http: HttpClient) {
    super(http);
  }

}