import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  extends NbLoginComponent implements OnInit  {
  priv
  constructor(service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options:{},
     cd: ChangeDetectorRef, router: Router){
   super(service,options,cd ,router);
  }
  messageInvalid: string;
  ngOnInit(): void {

    this.service.getToken().subscribe(token=>{
      console.log("isAuth", token);
      if (token.isValid()){
        this.router.navigateByUrl("pages/dashboard");
      }else{
        if (token.getValue()){
          this.messageInvalid ="Caduco tu sesión, vuele a iniciar";
          localStorage.removeItem('auth_app_token');

        }

      }
    })
  }
}
