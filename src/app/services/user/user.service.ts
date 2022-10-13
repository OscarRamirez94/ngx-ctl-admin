import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService<User>  {
  protected url = 'http://localhost:8081/microservice-ctl/users/';

  constructor(http: HttpClient) {
    super(http);
  }

}
