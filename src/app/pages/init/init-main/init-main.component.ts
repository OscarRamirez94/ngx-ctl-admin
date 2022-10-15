import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'ngx-init-main',
  templateUrl: './init-main.component.html',
  styleUrls: ['./init-main.component.scss']
})
export class InitMainComponent implements OnInit {

  client:Client;
  constructor(private headService:HeadService) { }

  ngOnInit(): void {
    this.getClientEmit();
  }

  getClientEmit(){
    this.headService.disparadorClient.subscribe(data =>{
    })
  }

}
