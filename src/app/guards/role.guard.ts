import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { Observable } from 'rxjs';
import { AuthRoleService } from '../services/auth/auth-role.service';
import { ToastrService } from '../services/toastr/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  nbAuthToken:NbAuthToken;
  authorities:any =[];

  constructor(private authService: NbAuthService,private router: Router,private toastrService:ToastrService) {
    this.authService.onTokenChange().subscribe(data =>{
      this.authorities = data.getPayload()['authorities']
  })
     console.log("authorities", this.authorities)
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    let role = next.data['role'];
      console.log("PARAM",role);
      if (this.hasRole(role)) {
        return true;
      }
      this.toastrService.toast('danger','Sin permisos','No tienes acceso a este recurso');
      //swal('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigateByUrl("pages/dashboard");
      return false;


  }

 hasRole(roles:String[]):Boolean{
    return roles.some(r=> this.authorities.includes(r));
 }

}
