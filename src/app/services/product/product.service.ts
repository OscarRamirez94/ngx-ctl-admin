import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product/product';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CommonService<Product> {
  protected url = 'http://localhost:8081/microservice-ctl/product/';

  constructor(http: HttpClient) {
   super(http);
  }

  getAllProductsByPartner(id): Observable<Product[]> {
    return this.http.get<Product[]>(this.url.concat("all/partner/",id));
  }
}
