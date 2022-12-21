import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../constant/app-settings';
import { Unity } from '../../models/unity/unity';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class UnityService extends CommonService<Unity> {
  protected url = AppSettings.API_ENDPOINT+'/unity/';

  constructor(http: HttpClient) {
   super(http);
  }
}
