import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../constant/app-settings';
import { PalletSave2 } from '../../models/pallet/pallet-save2';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class PalletSave2Service extends CommonService<PalletSave2> {
  protected url = AppSettings.API_ENDPOINT+'/pallet/';


  constructor(http: HttpClient) {
    super(http);
   }

}
