import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../constant/app-settings';
import { Profession } from '../../models/profession/profession';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService extends CommonService<Profession>  {
  protected url = AppSettings.API_ENDPOINT+'/profession/';

  constructor(http: HttpClient) {
    super(http);
  }

}
