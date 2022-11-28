import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbGlobalPosition, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ClientService } from '../../../services/client/client.service';
import { Client } from '../../../models/client';
import { HeadService } from '../../../services/head/head.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Notification } from '../../../models/notification/notification';
import { Console } from 'console';
import { ClientI } from '../../../interfaces/client-i';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  filteredClients: Observable<ClientI[]>;
  myControl = new FormControl('');
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  username:string;
  clients:ClientI[] = [];
  client: Client;
  clientName:string;
  position: NbGlobalPosition
  idL =  this.getClientLs();
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
          this.user = "Bienvenido " + token.getPayload()['sub'];
          this.username = token.getPayload()['username'];
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

    console.log(this.idL);

    if (this.idL !==null ){
      this.clientService.ver(+this.idL).subscribe(data =>{
        this.currentClient = data.name
        this.myControl.setValue(data);
      })
    }

    this.getAllClients();
    // notifica cuando se inserta un nuevo cliente en catalogo
    this.headService.disparadorClientComp.subscribe(data =>{
      let notifica:Notification =  data as Notification;
        if (data.isActive){
          this.myControl.setValue(notifica.client);
          this.currentClient = notifica.client.name;
        }else {
          console.log("id" + data.localId);
          this.getAllClients();
          this.clientService.ver(+data.localId).subscribe(data2 =>{
            this.getAllClients();
            console.log("data", data2)
            this.myControl.setValue(data2);
            this.currentClient = notifica.client.name;
          })
        }
    });

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
      this.filteredClients = this.myControl.valueChanges.pipe(
        startWith(null),
        map(client => (client ? this._filterClient(client) : this.clients.slice())),
      );
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
      this.clients = data as ClientI[];
    })

  }

  getClientLs():string{
    return this.headService.getClientLS();
  }

  private _filterClient(value: string): ClientI[] {
    console.log("value",value);
    const filterValue = value.toString().toLowerCase();

    return this.clients.filter(client =>
      client.name.toString().toLowerCase().includes(filterValue)
      );
  }
}
