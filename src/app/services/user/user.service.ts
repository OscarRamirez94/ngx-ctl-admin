import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../constant/app-settings';
import { User } from '../../models/user/user';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService<User>  {
  protected url = AppSettings.API_ENDPOINT+'/users/';

  constructor(http: HttpClient) {
    super(http);
  }

}
