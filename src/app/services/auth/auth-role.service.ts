import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { map, Observable } from 'rxjs';
import { Client } from '../../models/client';
import { CommonService } from '../commons.service';



@Injectable({
  providedIn: 'root'
})
export class AuthRoleService  {

  authorities:any =[];
 constructor(private authService: NbAuthService) {

  this.authService.getToken().subscribe(data =>{
      this.authorities = data.getPayload()['authorities']
  })
     console.log("authorities", this.authorities)

  }

 hasRole(role:string):Boolean{
    if (this.authorities.includes(role))
    {

      return true;
    }

    return false;
 }

}
