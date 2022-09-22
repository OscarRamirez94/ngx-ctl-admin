import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthToken} from '@nebular/auth';
import { tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  nbAuthToken:NbAuthToken;
  constructor(private authService: NbAuthService,private router: Router) {

  }
  canActivate() {


    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }


}
