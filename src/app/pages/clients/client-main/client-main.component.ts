import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';



import { ClientService } from '../../../services/client/client.service';
import { CommonListComponent } from '../../commons/common-list/common-list.component';

@Component({
  selector: 'ngx-client-main',
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.scss']
})
export class ClientMainComponent extends CommonListComponent<Client,ClientService> implements OnInit,AfterViewInit  {


  titulo:string = "Clientes";

  constructor( service:ClientService) {
    super(service);

  }
  ngAfterViewInit() {


  }

  ngOnInit() {

  }

}
