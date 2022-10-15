import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { AuthRoleService } from '../services/auth/auth-role.service';
import { HeadService } from '../services/head/head.service';

@Injectable({
  providedIn: 'root'
})
export class HeadClientGuard implements CanActivate {

  clientName:string;
  constructor(private headService: HeadService,private router: Router,private toastrService: NbToastrService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    let clientName = this.headService.getClientLS();
      console.log(clientName);
      if (clientName) {
        return true;
      }
      //swal('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.toastrService.danger("Antes de continuar","Selecciona un Cliente")
      return false;


  }


}
