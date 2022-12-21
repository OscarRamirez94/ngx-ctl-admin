import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CheckOut } from '../../../models/check-out/check-out';
import { CheckOutService } from '../../../services/check-out/check-out.service';
import { ReportService } from '../../../services/report/report.service';
import { saveAs } from 'file-saver';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-check-out-pallet-view',
  templateUrl: './check-out-pallet-view.component.html',
  styleUrls: ['./check-out-pallet-view.component.scss']
})
export class CheckOutPalletViewComponent implements OnInit {
  displayedColumns: string[] = ['entrada','date','amount','ua','name','code','transportLine','um','lote','expiration']

  dataSource: MatTableDataSource<any>;
  lista:any[] = [];
  registrado:string;
  loading = false;
  constructor(
    private activatedRoute:ActivatedRoute,
    private checkOutService:CheckOutService,
    private formBuilder: FormBuilder,
    private reportService:ReportService,
    private nbToasterService:NbToastrService) {
    this.dataSource = new MatTableDataSource(this.lista);
    }

  checkOutId:number;
  checkOut:CheckOut;
  checkOutForm !: FormGroup;
  ngOnInit(): void {

    this.checkOutId = +this.activatedRoute.snapshot.paramMap.get("id");
    this.getChekOutById();
  }

  getChekOutById(){
    //let checkOutDetails:CheckOutDetail []= [];
    this.checkOutService.getById(this.checkOutId).subscribe(data =>{

      console.info("this.", data);
      this.checkOut = data as CheckOut;
      this.registrado =  "Registrado por : " + this.checkOut.user.firstName + " "+
      this.checkOut.user.additionalName + " "+
      this.checkOut.user.lastName + " "+
      this.checkOut.user.secondName ;
      this.lista = data.checkOutDetails;
      this.dataSource = new MatTableDataSource(data.checkOutDetails);
      this.setForm();
    })

  };

  setForm() {
    this.checkOutForm = this.formBuilder.group({
      id: [{value: this.checkOut?.id, disabled: true}, Validators.required],
      partner: [{value: this.checkOut?.partner.name, disabled: true}, Validators.required],
      phone: [{value: this.checkOut?.partner.address.phone, disabled: true}, Validators.required],
      attention: [{value: this.checkOut?.partner.address.attention, disabled: true}, Validators.required],
      text: [{value: this.checkOut?.partner.address.text, disabled: true}, Validators.required],
      colonia: [{value: this.checkOut?.partner.address.colonia, disabled: true}, Validators.required],
      district: [{value: this.checkOut?.partner.address.district, disabled: true}, Validators.required],
      state: [{value: this.checkOut?.partner.address.state, disabled: true}, Validators.required],
      city: [{value: this.checkOut?.partner.address.city, disabled: true}, Validators.required],
      postalCode: [{value: this.checkOut?.partner.address.postalCode, disabled: true}, Validators.required],
      country: [{value: this.checkOut?.partner.address.country, disabled: true}, Validators.required],

      remision: [{value: this.checkOut?.remision, disabled: true}, Validators.required],
      date: [{value: this.checkOut?.date, disabled: true}, Validators.required],
      noSello: [{value: this.checkOut?.noSello, disabled: true}, Validators.required],
      noSello2: [{value: this.checkOut?.noSello, disabled: true}, Validators.required],
      transportType: [{value: this.checkOut?.transportCapacity.transportType.name, disabled: true}, Validators.required],
      transportLine: [{value: this.checkOut?.transportLine.name, disabled: true}, Validators.required],
      transportCapacity: [
        { value: this.checkOut?.transportCapacity.capacity + " " +
                 this.checkOut?.transportCapacity.unity , disabled: true
        }, Validators.required],

      operator: [{value: this.checkOut?.operator, disabled: true}, Validators.required],
      tractoPlacas: [{value: this.checkOut?.tractoPlacas, disabled: true}, Validators.required],
      cajaPlacas: [{value: this.checkOut?.cajaPlacas, disabled: true}, Validators.required],
      responsible: [
        { value: this.checkOut?.responsible.firstName + " " +
                 this.checkOut?.responsible.additionalName + " " +
                 this.checkOut?.responsible.lastName + " " +
                 this.checkOut?.responsible.secondName
        , disabled: true}, Validators.required],




    });
  }


  generaReport() {
    this.loading = true;
    let name :string = "Remision"+this.checkOut.remision + ".pdf";

    this.reportService.generateReport(this.checkOut).subscribe({
      next: (data) =>{
        const blob =new Blob([data],{type: "application/pdf"});
        saveAs(blob, name);
        this.nbToasterService.success("Se genero con éxito:" + name ,"Success");
      },
      error: (e) =>{
        this.loading = false;
        console.error("error",e.error.status)
        this.nbToasterService.danger("Ocurrio algo inesperado","Error");
      },
      complete: () =>{
        console.info("complete")
        this.loading = false;
      }
    });
  }


}
