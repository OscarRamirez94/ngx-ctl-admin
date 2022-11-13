import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { PalletI } from '../../../interfaces/pallet-i';
import { Pallet } from '../../../models/pallet/pallet';
import { Product } from '../../../models/product/product';
import { SearchCriteriaClient } from '../../../models/searchs/search-criteria-client';
import { TransportLine } from '../../../models/transport-line/transport-line';
import { HeadService } from '../../../services/head/head.service';
import { PalletService } from '../../../services/pallet/pallet.service';
import { ProductService } from '../../../services/product/product.service';
import { TransportLineService } from '../../../services/transport-line/transport-line.service';
import { CommonListPalletComponent } from '../../commons/common-list/common-list.component-pallet';


@Component({
  selector: 'ngx-check-out-pallet',
  templateUrl: './check-out-pallet.component.html',
  styleUrls: ['./check-out-pallet.component.scss']
})
export class CheckOutPalletComponent implements OnInit,AfterViewInit   {
  /* paginator and mat table */

@ViewChild(MatPaginator) paginator :MatPaginator;
@ViewChild(MatSort)sort: MatSort;
error: any;
sortedData: Object[];
totalRegistros=0;
paginaActual = 0;
totalPorPagina = 10;
orderBy ="ASC";
column ="id";
pageSizeOptions = [10, 25,50,100];
ariaLabel="Select page";
filterValue ="";
lista: PalletI[];
dataSource: MatTableDataSource<PalletI>;
remisionVisible:boolean=false;
fechaVisible:boolean=false;
transportLineVisible:boolean=false;
productVisible:boolean=false;
loteVisible:boolean=false;

  myControl = new FormControl('');
  optionss: string[] = ['One', 'Two', 'Three'];
  option: string;
  filterBy:string;

  searchForm !: FormGroup;
  submitted = false;
  actionBtn:String = "Buscar";
  processTypeId:string ="1";
  name: string;
  titulo:string = "CheckOut";
  displayedColumns: string[] = ['select','id','name','code','ua','amount','um','lote','expiration'];
  options: string[] = ['TODOS', 'REMISION', 'FECHA','LINEA DE TRANSPORTE','PRODUCTO','LOTE'];
  products:Product[] = [];
  transportLines:TransportLine[] = [];
  remisionControl = new FormControl('', []);
  fechaControl = new FormControl('', []);
  typeSearchControl = new FormControl('', []);
  loteControl = new FormControl('', []);
  transportLineControl = new FormControl('', []);
  productControl = new FormControl('', []);
  clientName =  this.headService.getClientLS();
  constructor(private service:PalletService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toastrService: NbToastrService,
    private headService:HeadService,
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private transportLineService:TransportLineService
    )

    {
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;

    }


  ngOnInit(): void {
    this.getProductos();
    this.getTL();
    this.paginator;

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }





  onSubmit() {
    console.log("console");

    if (this.option == "TODOS"){
      this.filterBy =  "TODOS";
  }

  if (this.option =="REMISION"){
      this.filterBy =  this.remisionControl.value;

  }
  if (this.option == "FECHA"){
      this.filterBy =  this.fechaControl.value;
  }

  if (this.option == "LOTE"){
    this.filterBy =  this.loteControl.value;
  }

  if(this.option =="LINEA DE TRANSPORTE"){
    this.filterBy =  this.filterBy;
  }
  if(this.option =="PRODUCTO"){
    this.filterBy =  this.filterBy;
  }
  this.calculateRange(this.option,this.filterBy)

  }

  onReset(){


  }


  selection = new SelectionModel<PalletI>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PalletI): string {
    console.log("row", row)
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }


  public calculateRange(option:string,filter:string){

    const search: SearchCriteriaClient = new SearchCriteriaClient();
    search.pageNumber = this.paginaActual;
    search.pageSize = this.totalPorPagina;
    search.searchBy =this.filterValue;
    search.sortBy=this.column;
    search.sortDirection =this.orderBy;

    this.service.getFilterCriteriaClientOut(search,this.clientName, option, filter)
    .subscribe(paginator => {
      console.log(paginator.totalElements)
      this.lista = paginator.content as PalletI[];
      this.totalRegistros = paginator.totalElements as number;
      this.paginator._intl.itemsPerPageLabel ="Registros";
      this.dataSource = new MatTableDataSource(this.lista);
      console.log(this.dataSource.data);


    });
  }

  paginar(event:PageEvent) :void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    //this.calculateRange();
  }

  applyFilter(event: Event) {
    const fil:string  = (event.target as HTMLInputElement).value;
    if(fil !==null && fil !== ''){
        this.filterValue = fil;
        //this.calculateRange();
    } else{
        this.filterValue ="";
        //this.calculateRange();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      //this.calculateRange();
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

      //this.calculateRange();
    }
  }

  optionSelectedTypeSearch(event){

    this.option = event.option.value;
    this.disables();
    if (event.option.value =="REMISION"){
      this.remisionVisible = true;
    }

    if (event.option.value == "FECHA"){
        this.fechaVisible = true;
    }

    if (event.option.value == "LOTE"){
      this.loteVisible = true;
    }

    if (event.option.value == "LINEA DE TRANSPORTE"){
    this.transportLineVisible = true;
    }
    if (event.option.value == "PRODUCTO"){
      this.productVisible = true;
      }

  }

  displayPropertyTypeSearch(value){
    if (value) {
      return value;
    }
  }
  disables(){
    this.remisionControl.reset();
    this.fechaControl.reset();
    this.loteControl.reset();
    this.transportLineControl.reset();
    this.productControl.reset();

    this.remisionVisible = false;
    this.fechaVisible = false;
    this.loteVisible = false;
    this.transportLineVisible = false;
    this.productVisible = false;
  }

  getProductos(){
    this.productService.getAllProductsByPartner(this.clientName).subscribe(data =>{
      this.products = data as Product[];
    })
  }
  optionSelectedProduct(event){
    console.log("valor id producto",event.option.value.id)
    this.filterBy =  event.option.value.id;

  }
  displayPropertyProduct(value){
    if (value) {
      return value.name;
    }
  }

  getTL(){
    this.transportLineService.getAllTLByPartner(this.clientName).subscribe(data =>{
      this.transportLines = data as TransportLine[];
    })
  }
  optionSelectedTL(event){
    console.log("valor id tl",event.option.value.id)
    this.filterBy =  event.option.value.id;

  }
  displayPropertyTL(value){
    if (value) {
      return value.name;
    }
  }

}

