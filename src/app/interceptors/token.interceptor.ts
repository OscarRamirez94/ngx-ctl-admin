import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthToken} from '@nebular/auth';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  nbAuthToken:NbAuthToken;
  constructor(private authService: NbAuthService) { }
  token = null;

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.token = this.getTokenLocal();
    console.log("token intercepto1", this.token);
    if (this.token) {
      console.log("token interceptor2", this.token);
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.token}`)
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }

  getTokenLocal(){

    this.authService.getToken().subscribe(data =>{
      this.nbAuthToken = data as NbAuthToken;
      this.token = this.nbAuthToken.getValue();
    });
    return this.token;
  }
}
