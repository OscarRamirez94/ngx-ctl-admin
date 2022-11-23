import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReportService } from '../../../services/report/report.service';
import { multi } from './datos';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'ngx-tablero-main',
  templateUrl: './tablero-main.component.html',
  styleUrls: ['./tablero-main.component.scss']
})
export class TableroMainComponent   implements OnInit {
  multi: any[];
  view: [number,number] = [500, 400];
  // options
// options
showXAxis: boolean = true;
showYAxis: boolean = true;
gradient: boolean = true;
showLegend: boolean = true;
showXAxisLabel: boolean = true;
xAxisLabel: string = 'Clientes';
showYAxisLabel: boolean = true;
showDataLabel:boolean = true;
yAxisLabel: string = 'Pallets';
legendTitle: string = 'CheckList';
cardColor: string = '#232837';
colorScheme;
schemeType: string = 'ordinal';
themeSubscription: any;
xAxisLabelP: string = 'Productos';
xAxisLabelL: string = 'Linea Transporte';

client:string;
data:any[]= [];
productCharts:any[]= [];
transportCharts:any[]= [];
topCharts:any[]= [];
loading = false;
loadingMaster = false;
  constructor(private theme: NbThemeService,
    private reportService:ReportService) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }


ngOnInit(): void {
  this.getPieChart();
}

onSelect(data): void {
  this.loading = true;
  let client =  JSON.parse(JSON.stringify(data)).series;
  this.client = client;
  this.getProductChart(client);
  this.getTransportChart(client);
  this.getListTopChart(client);
  this.loading = false;
}

onActivate(data): void {

}

onDeactivate(data): void {

}

onResize(event) {
  this.view = [event.target.innerWidth / 1.35, 400];
}

getPieChart(){
  this.reportService.getPieChart().subscribe(data =>{
  let datos: any[] = [];
    data.forEach( p=>{
      datos.push({
        "name": p.name,
          "series":[
            {
              "name": "stock",
              "value": +p.checkin

            },
            {
              "name": "Out",
              "value": +p.checkout

            },
            {
              "name": "Total",
              "value": +p.total

            },
          ]
      });
    this.data = datos;
    this.loading = true;
    });
    this.loadingMaster = false;
  })
}

getProductChart(client:string){
  this.reportService.getProductChart(client).subscribe(data =>{
    let datos: any[] = [];
    this.productCharts = datos;
      data.forEach( p=>{
        datos.push({
          "name": p.name,
          "series":[
            {
              "name": "stock",
              "value": +p.checkin

            },
            {
              "name": "Out",
              "value": +p.checkout

            },
            {
              "name": "Total",
              "value": +p.total

            },
        ]});
    this.productCharts = datos;
    });
  })
}

getTransportChart(client:string){
    this.reportService.getTransportChart(client).subscribe(data =>{
    let datos: any[] = [];
    this.transportCharts = datos;
      data.forEach( p=>{
        datos.push({
          "name": p.name,
          "series":[
            {
              "name": "stock",
              "value": +p.checkin

            },
            {
              "name": "Out",
              "value": +p.checkout

            },
            {
              "name": "Total",
              "value": +p.total

            },
        ]});
    this.transportCharts = datos;
    });
  })
}

getListTopChart(client:string){
  this.reportService.getListTopChart(client).subscribe(data =>{
    let datos: any[] = [];
    this.topCharts = datos;
      data.forEach( p=>{
        datos.push(
            {
              "name": p.name,
              "value": +p.total
            });
    this.topCharts = datos;
    });
  })
}
v}
