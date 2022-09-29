import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { Observable } from 'rxjs';
import { AuthRoleService } from '../services/auth/auth-role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  nbAuthToken:NbAuthToken;
  authorities:any =[];

  constructor(private authService: NbAuthService,private router: Router) {
    this.authService.onTokenChange().subscribe(data =>{
      this.authorities = data.getPayload()['authorities']
  })
     console.log("authorities", this.authorities)
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    let role = next.data['role'] as string;
      console.log(role);
      if (this.hasRole(role)) {
        return true;
      }
      //swal('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigateByUrl("pages/dashboard");
      return false;


  }

 hasRole(role:string):Boolean{
    if (this.authorities.includes(role))
    {
      console.log(true);
      return true;
    }
    console.log(false);
    return false;
 }

}
