import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unity } from '../../models/unity/unity';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class UnityService extends CommonService<Unity> {
  protected url = 'http://localhost:8081/microservice-ctl/unity/';

  constructor(http: HttpClient) {
   super(http);
  }
}
