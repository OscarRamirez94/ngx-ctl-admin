import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfessionI } from '../../interfaces/profession-i';
import { User } from '../../models/user/user';
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
  getAllProfessions(): Observable<ProfessionI[]> {
    return this.http.get<ProfessionI[]>(this.urlProfession.concat("all"));
  }
  userByUsername(username:string): Observable<UserPost> {
    return this.http.get<UserPost>(this.url.concat("username/",username));
  }
  updatePassword(userPassword:any): Observable<any> {
    return this.http.put<any>(`${this.url + 'change-password/'}${userPassword.id}`, userPassword);
  }
}
