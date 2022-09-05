import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Generic } from "../models/generic/generic";
import { SearchCriteriaClient } from "../models/searchs/search-criteria-client";


export abstract class CommonService<E extends Generic> {

  searach:SearchCriteriaClient
  protected url: string;

  constructor(protected http: HttpClient) { }

  getAll(): Observable<E[]> {
    return this.http.get<E[]>(this.url);
  }

  getAllPageable(page: string, size: string,orderBy: string, column: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort',orderBy)
      .set('column',column);

    return this.http.get<any>(this.url.concat("/pageable/column"), { params: params });
  }

  getFilterCriteria(search:SearchCriteriaClient): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', search.pageNumber)
      .set('pageSize', search.pageSize)
      .set('sortDirection',search.sortDirection)
      .set('sortBy',search.sortBy)
      .set('searchBy',search.searchBy);

    return this.http.get<any>(this.url.concat("/search/"), { params: params });
  }


}

