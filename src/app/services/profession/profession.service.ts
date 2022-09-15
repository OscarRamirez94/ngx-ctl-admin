import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profession } from '../../models/profession/profession';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService extends CommonService<Profession>  {
  protected url = 'http://localhost:8081/microservice-ctl/profession/';

  constructor(http: HttpClient) {
    super(http);
  }

}
