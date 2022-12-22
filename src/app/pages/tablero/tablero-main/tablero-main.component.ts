import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReportService } from '../../../services/report/report.service';
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
  view: [number,number] = [1100, 400];
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

yAxisLabelCantidadProducto: string = 'Cantidad Total';

client:string;
data:any[]= [];
productCharts:any[]= [];
transportCharts:any[]= [];
topCharts:any[]= [];
loading = false;
loadingMaster:boolean = true;
loadingTop:boolean = true;
loadingProducto:boolean = true;
loadingLinea:boolean = true;
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

  this.reportService.getPieChart().subscribe({
    next: (data) =>{
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
      });

    },
    error: (e) =>{
      console.error("error",e.error.status)

    },
    complete: () => {
      this.loadingMaster = false;
      console.info("complete")
    }
  });
}

getProductChart(client:string){
  this.loadingProducto = true;
  this.reportService.getProductChart(client).subscribe({
    next: (data) =>{
      let datos: any[] = [];
      this.productCharts = datos;
        data.forEach( p=>{
          datos.push({
            "name": p.name,
            "series":[
              {
                "name": "Registrado",
                "value": +p.checkin

              },
              {
                "name": "Liberado",
                "value": +p.checkout

              },
              {
                "name": "Total",
                "value": +p.total

              },
          ]});
      this.productCharts = datos;
      });

    },
    error: (e) =>{
      console.error("error",e.error.status)

    },
    complete: () => {
      this.loadingProducto = false;
      console.info("complete")
    }
  });


}

getTransportChart(client:string){

  this.loadingLinea = true;
  this.reportService.getTransportChart(client).subscribe({
    next: (data) =>{
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
    },
    error: (e) =>{
      console.error("error",e.error.status)

    },
    complete: () => {
      this.loadingLinea = false;
      console.info("complete")
    }
  });

}

getListTopChart(client:string){
  this.loadingTop = true;
  this.reportService.getListTopChart(client).subscribe({
    next: (data) =>{
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
    },
    error: (e) =>{
      console.error("error",e.error.status)

    },
    complete: () => {
      this.loadingTop = false;
      console.info("complete")
    }
  });
}
}
