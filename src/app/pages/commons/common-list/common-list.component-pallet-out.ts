import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Directive, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { stringify } from 'querystring';
import { Observable, Subject } from 'rxjs';
import { PalletI } from '../../../interfaces/pallet-i';
import { Generic } from '../../../models/generic/generic';
import { SearchCriteriaClient } from '../../../models/searchs/search-criteria-client';
import { CommonService } from '../../../services/commons.service';
import { HeadService } from '../../../services/head/head.service';

@Directive()
export abstract class CommonListPalletOutComponent<E extends Generic, S extends CommonService<E>> implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator)
   paginator :MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  titulo: string;
  model: E;
  error: any;
  protected redirect: string;
  protected nombreModel: string;
  loading :boolean = false;
  processTypeId:string;
  sortedData: Object[];
  // config pagination
  totalRegistros=0;
  paginaActual = 0;
  totalPorPagina = 50;
  orderBy ="ASC";
  column ="id";
  pageSizeOptions = [50,100];
  ariaLabel="Select page";
  filterValue ="";
  lista: PalletI[];
  clientName:string;
  option:string;
  filterBy:string;
  dataSource: MatTableDataSource<PalletI>;
  selection = new SelectionModel<PalletI>(true, []);
  map = new Map();
  constructor(protected service:S,protected router: Router,
    protected route: ActivatedRoute,
    protected toastrService: NbToastrService,
    protected headService:HeadService) {
    this.dataSource = new MatTableDataSource(this.lista);
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {

  this.clientName =  this.headService.getClientLS();
  this.calculateRange();

  this.headService.disparadorClient.subscribe(data =>{
    this.clientName =  data;
    this.calculateRange();
   })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  paginar(event:PageEvent) :void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calculateRange();
  }

  public calculateRange(){
    this.selection.clear();
    this.loading = true;
    const search: SearchCriteriaClient = new SearchCriteriaClient();
    search.pageNumber = this.paginaActual;
    search.pageSize = this.totalPorPagina;
    search.searchBy =this.filterValue;
    search.sortBy=this.column;
    search.sortDirection =this.orderBy;


    this.service.getFilterCriteriaLiberados(search,this.clientName)
    .subscribe(paginator => {
      console.log(paginator.totalElements)
      this.lista = paginator.content as PalletI[];
      this.totalRegistros = paginator.totalElements as number;
      this.paginator._intl.itemsPerPageLabel ="Registros";
      this.dataSource = new MatTableDataSource(this.lista);
      console.log(this.dataSource.data);
      this.loading = false;

    });


  }

  applyFilter(event: Event) {
    const fil:string  = (event.target as HTMLInputElement).value;
    if(fil !==null && fil !== ''){
        this.filterValue = fil;
        this.calculateRange();
    } else{
        this.filterValue ="";
        this.calculateRange();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.calculateRange();
    } else {

      if (sort.direction == "asc"){
        this.orderBy = "ASC";
      }

      if (sort.direction == "desc") {
        this.orderBy ="DESC";
      }

      if (sort.active == 'direccion'){
          sort.active="text";
      }

      this.column = sort.active;

    this.calculateRange();
    }
  }

  public crear(): Observable<Boolean> {
    var subject = new Subject<boolean>();
    this.service.crear(this.model).subscribe(m => {
      subject.next(true);
      console.log(m);
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
      subject.next(false);
    });
    return subject.asObservable();
  }

  public editar(): void {
    console.log("update" + JSON.stringify(this.model));
    this.service.editar(this.model).subscribe(m => {
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  protected displayedColumns: string[] ;

// config toastr
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  preventDuplicates = false;

  positions: string[] = [
    NbGlobalPhysicalPosition.TOP_RIGHT,
    NbGlobalPhysicalPosition.TOP_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    NbGlobalLogicalPosition.TOP_END,
    NbGlobalLogicalPosition.TOP_START,
    NbGlobalLogicalPosition.BOTTOM_END,
    NbGlobalLogicalPosition.BOTTOM_START,
  ];



  private showToast(status:string, body: string) {
    const config = {
      status: status,
      tittle: "Clientess",
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    this.toastrService.show (
      body, this.nombreModel,
      config);
  }

  public toast(status:string, content:string){
    this.showToast(status, content, );
  }

  delete (id:any){
    this.service.eliminar(id).subscribe(() => {
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.map = new Map();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PalletI): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}