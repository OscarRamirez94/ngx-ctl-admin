import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../constant/app-settings';
import { PalletSave } from '../../models/pallet/pallet-save';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class PalletSaveService extends CommonService<PalletSave> {
  protected url = AppSettings.API_ENDPOINT+'/pallet/';


  constructor(http: HttpClient) {
    super(http);
   }

}
