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
  view: [number,number] = [700, 400];

  // options
// options
showXAxis: boolean = true;
showYAxis: boolean = true;
gradient: boolean = true;
showLegend: boolean = true;
showXAxisLabel: boolean = true;
xAxisLabel: string = 'Clientes';
showYAxisLabel: boolean = true;
yAxisLabel: string = 'Pallets';
legendTitle: string = 'CheckList';
  colorScheme;
  schemeType: string = 'linear';
  themeSubscription: any;
  data:any[]= [];

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
  this.reportService.getPieChart().subscribe(data =>{
  let datos: any[] = [];
    data.forEach( p=>{
      console.log("p" +  JSON.stringify(p));
    datos.push({
      "name": p.cliente,
      "series":[
        {
          "name": "Entradas",
          "value": +p.entradas

        },
        {
          "name": "Salidas",
          "value": +p.salidas

        },
      ]


  });

  this.data = datos;
  console.log(this.data);
   })


  })
}






  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
