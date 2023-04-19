import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CotizacionesI } from '../../../interfaces/cotizaciones-i';
import { CotizacionesService } from '../../../services/cotizaciones/cotizacionez.service';

@Component({
  selector: 'ngx-cotizaciones-main',
  templateUrl: './cotizaciones-main.component.html',
  styleUrls: ['./cotizaciones-main.component.scss']
})
export class CotizacionesMainComponent implements OnInit {
  displayedColumns: string[] = ['name','message', 'email','phone','fecha'];
  lista: CotizacionesI[];
  dataSource: MatTableDataSource<CotizacionesI>;
  loading:boolean = true;
  constructor(private cotizacionesService:CotizacionesService) { }

  ngOnInit(): void {

    this.getAllCotizaciones();
  }

  getAllCotizaciones(){
    this.loading = true;

    this.cotizacionesService.getAllCotizaciones().subscribe({
      next: (data) =>{
        this.lista = data as CotizacionesI[];
        this.dataSource = new MatTableDataSource(this.lista);
      },
      error: (e) =>{
        console.error("error",e.error.status)

      },
      complete: () => {
        this.loading = false;
      }
    });

  }
}
