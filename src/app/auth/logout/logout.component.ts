import { Component, Injector, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    localStorage.removeItem('auth_app_token');
    this.router.navigateByUrl('/auth/login');

  }
}
