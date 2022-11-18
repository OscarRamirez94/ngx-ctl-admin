import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Generic } from "../models/generic/generic";
import { SearchCriteriaClient } from "../models/searchs/search-criteria-client";


export abstract class CommonService<E extends Generic> {

  searach:SearchCriteriaClient
  protected url: string;
  protected cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(protected http: HttpClient) { }

  getAll(): Observable<E[]> {
    return this.http.get<E[]>(this.url.concat("all"));
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

    return this.http.get<any>(this.url.concat("all/search/"), { params: params });
  }

  getFilterCriteriaClient(search:SearchCriteriaClient,clientName:string): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', search.pageNumber)
      .set('pageSize', search.pageSize)
      .set('sortDirection',search.sortDirection)
      .set('sortBy',search.sortBy)
      .set('searchBy',search.searchBy);

    return this.http.get<any>(this.url.concat("all/search/",clientName), { params: params });
  }

  getFilterCriteriaClientProcess(search:SearchCriteriaClient,clientName:string,processTypeId:string): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', search.pageNumber)
      .set('pageSize', search.pageSize)
      .set('sortDirection',search.sortDirection)
      .set('sortBy',search.sortBy)
      .set('searchBy',search.searchBy);

    return this.http.get<any>(this.url.concat("all/search/",clientName,"/",processTypeId), { params: params });
  }


  getFilterCriteriaClientOut(search:SearchCriteriaClient,clientName:string,option:string, filter:string): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', search.pageNumber)
      .set('pageSize', search.pageSize)
      .set('sortDirection',search.sortDirection)
      .set('sortBy',search.sortBy)
      .set('searchBy',search.searchBy);

    return this.http.get<any>(
      this.url.concat("all/search/client/",clientName,"/option/",option,"/filter/",filter),
       { params: params });
  }


  getFilterCriteriaLiberados(search:SearchCriteriaClient,clientName): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', search.pageNumber)
      .set('pageSize', search.pageSize)
      .set('sortDirection',search.sortDirection)
      .set('sortBy',search.sortBy)
      .set('searchBy',search.searchBy);

    return this.http.get<any>(
      this.url.concat("all/search/liberados/client/",clientName),
       { params: params });
  }

  getFilterCriteriaClientOutFecha(search:SearchCriteriaClient,clientName:string,option:string, filter:string): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', search.pageNumber)
      .set('pageSize', search.pageSize)
      .set('sortDirection',search.sortDirection)
      .set('sortBy',search.sortBy)
      .set('searchBy',search.searchBy);

    return this.http.get<any>(
      this.url.concat("all/search/client/",clientName,"/option/",option,"/filter/",filter),
       { params: params });
  }

  getFilterCriteriaById(search:SearchCriteriaClient, id:any): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', search.pageNumber)
      .set('pageSize', search.pageSize)
      .set('sortDirection',search.sortDirection)
      .set('sortBy',search.sortBy)
      .set('searchBy',search.searchBy);

    return this.http.get<any>(this.url.concat("all/search/",id), { params: params });
  }

  getFilterCriteriaPalletOut(search:SearchCriteriaClient,clientName:string): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', search.pageNumber)
      .set('pageSize', search.pageSize)
      .set('sortDirection',search.sortDirection)
      .set('sortBy',search.sortBy)
      .set('searchBy',search.searchBy);

    return this.http.get<any>(this.url.concat("all/search/client/",clientName), { params: params });
  }

  public ver(id: number): Observable<E> {
    return this.http.get<E>(this.url+id);
  }

  public crear(e: E): Observable<E> {
    return this.http.post<E>(this.url, e,
      { headers: this.cabeceras });
  }

  public editar(e: E): Observable<E> {
    return this.http.put<E>(`${this.url}${e.id}`, e,
      { headers: this.cabeceras });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }
}

