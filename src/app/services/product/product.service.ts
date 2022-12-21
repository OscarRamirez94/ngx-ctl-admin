import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../constant/app-settings';
import { ProductoI } from '../../interfaces/product-i';
import { Product } from '../../models/product/product';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CommonService<Product> {
  protected url = AppSettings.API_ENDPOINT+'/product/';

  constructor(http: HttpClient) {
   super(http);
  }

  getAllProductsByPartner(id): Observable<ProductoI[]> {
    return this.http.get<ProductoI[]>(this.url.concat("all/partner/",id));
  }
}
