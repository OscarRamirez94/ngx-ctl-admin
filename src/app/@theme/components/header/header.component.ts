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
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  myControl = new FormControl('');
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

  userMenu = [
  { title: 'Mi Perfil', link: '/pages/users/users-profile' },
  { title: 'Cerrar Sesión',link: '/auth/logout'  }
];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
              private clientService:ClientService,
              private headService:HeadService,
              private toastrService: NbToastrService ,
              private route:Router,
              private dialog: MatDialog) {

      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = "Bienvenido " + token.getPayload()['sub']
        }

      });


  }

  optionSelected(event:Client){
    console.log(event.id + event.name);
    this.currentClient = event.name;
    this.headService.saveClient(event.id.toString());
    this.headService.saveNameClient(event.name);
    this.headService.disparadorClient.emit(event.id.toString());
    this.toastrService.primary("Trabajando con : " + event.name ,"Cliente seleccionado");
    this.route.navigateByUrl('pages/dashboard');

  }

  displayProperty(value) {
    if (value) {
      return value.name;
    }
  }
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // notifica cuando se inserta un nuevo cliente en catalogo
    this.headService.disparadorClientComp.subscribe(data =>{
      this.myControl.setValue(data);
      this.currentClient = data.name;
    });

    let id =  this.getClientLs();
    console.log(id);

    if (id !==null ){
      this.clientService.ver(+id).subscribe(data =>{
        this.currentClient = data.name
        this.myControl.setValue(data);
      })


    }

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
