import { AfterViewInit, Component, Directive, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Generic } from '../../../models/generic/generic';
import { SearchCriteriaClient } from '../../../models/searchs/search-criteria-client';
import { CommonService } from '../../../services/commons.service';

@Directive()
export abstract class CommonListComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  @ViewChild(MatPaginator)
  paginator :MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  protected nombreModel: string;
  sortedData: Object[];
  // config pagination
  totalRegistros=0;
  paginaActual = 0;
  totalPorPagina = 1;
  orderBy ="ASC";
  column ="id";
  pageSizeOptions = [1,2,5, 10, 25, 100];
  ariaLabel="Select page";
  filterValue ="";
  titulo: string;
  lista: E[];
  dataSource: MatTableDataSource<E>;

  constructor(protected service:S) {
    this.calculateRange();
  }

  ngOnInit(): void {

    this.calculateRange();

  }

  paginar(event:PageEvent) :void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calculateRange();
  }

  private calculateRange(){

    const search: SearchCriteriaClient = new SearchCriteriaClient();
    search.pageNumber = this.paginaActual;
    search.pageSize = this.totalPorPagina;
    search.searchBy =this.filterValue;
    search.sortBy=this.column;
    search.sortDirection =this.orderBy;
    console.log(search,"search by");

    this.service.getFilterCriteria(search)
    .subscribe(paginator => {
      console.log(paginator.totalElements)
      this.lista = paginator.content as E[];
      this.totalRegistros = paginator.totalElements as number;
      this.paginator._intl.itemsPerPageLabel ="Registros";
      this.dataSource = new MatTableDataSource(this.lista);
      console.log("sort", this.orderBy , "column", this.column)
    });
  }
  applyFilter(event: Event) {
    const fil:string  = (event.target as HTMLInputElement).value;


    if(fil !==null && fil !== ''){
      console.log("fil", fil);
      this.filterValue = fil;
      this.calculateRange();
    }else{
      console.log("sin data fil");
      this.filterValue ="";
      this.calculateRange();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortData(sort: Sort) {
    let order:String;
    console.log("direction", sort.direction);


    if (!sort.active || sort.direction === '') {
      console.log("1::");

      this.calculateRange();
    }else{
      console.log("2::");
      if (sort.direction == "asc"){
        this.orderBy = "ASC";
        console.log("1:::");
      }
      if (sort.direction == "desc") {
        this.orderBy ="DESC";
        console.log("2:::");
      }

      this.column = sort.active;

      this.calculateRange();

    }
  }


  displayedColumns: string[] = ['id', 'name','isActive'];
}
