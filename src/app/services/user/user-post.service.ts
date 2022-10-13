import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professionl } from '../../interfaces/profession-i';
import { UserPost } from '../../models/user/user-post';
import { CommonService } from '../commons.service';

@Injectable({
  providedIn: 'root'
})
export class UserPostService extends CommonService<UserPost>  {

  protected url = 'http://localhost:8081/microservice-ctl/users/';
  
  private urlProfession = 'http://localhost:8081/microservice-ctl/profession/';
  constructor(http: HttpClient) {
    super(http);
  }
  getAllProfessions(): Observable<Professionl[]> {
    return this.http.get<Professionl[]>(this.urlProfession.concat("all"));
  }
}
