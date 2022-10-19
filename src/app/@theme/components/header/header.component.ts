import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbGlobalPosition, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ClientService } from '../../../services/client/client.service';
import { Client } from '../../../models/client';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  clients:Client[];
  client: Client;
  clientName:string;
  position: NbGlobalPosition
  themes = [
    {
      value: 'default',
      name: 'Light',
    }
    /*,
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    }*/,
  ];

  currentTheme = 'default';
  currentClient :string;

  userMenu = [ { title: 'Mi Perfil', link: '/pages/users/users-profile' }, { title: 'Cerrar Sesión',link: '/auth/logout'  } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
              private clientService:ClientService,
              private headService:HeadService,
              private toastrService: NbToastrService ) {

                this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {

          this.user = "Bienvenido " + token.getPayload()['firstName']
        }

      });
  }

  ngOnInit() {

    this.currentTheme = this.themeService.currentTheme;
    this.currentClient = this.getClientLs();

    this.getAllClients();
   /* this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);
*/
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeClient(client: any) {

    this.headService.saveClientLS(client);
    this.headService.disparadorClient.emit(client);
    //this.currentClient = client
    this.toastrService.primary("Trabajando con : " + client ,"Cliente seleccionado");

  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    return false;
  }

  getAllClients(){
    this.clientService.getAll().subscribe(data =>{
      this.clients = data as Client[];
    })
  }
  getClientLs():string{
    return this.headService.getClientLS();
  }


}
