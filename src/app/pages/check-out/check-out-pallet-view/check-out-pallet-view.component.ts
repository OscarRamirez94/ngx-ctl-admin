import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PalletI } from '../../../interfaces/pallet-i';
import { CheckOut } from '../../../models/check-out/check-out';
import { CheckOutService } from '../../../services/check-out/check-out.service';

@Component({
  selector: 'ngx-check-out-pallet-view',
  templateUrl: './check-out-pallet-view.component.html',
  styleUrls: ['./check-out-pallet-view.component.scss']
})
export class CheckOutPalletViewComponent implements OnInit {
  displayedColumns: string[] = ['id','remision','transportLine','date','name','code','ua','amount','um','lote','expiration'];
  dataSource: MatTableDataSource<PalletI>;
  lista:any[] = [];
  constructor(
    private activatedRoute:ActivatedRoute,
    private checkOutService:CheckOutService,
    private formBuilder: FormBuilder) {
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

    this.checkOutService.getById(this.checkOutId).subscribe(data =>{
      this.checkOut = data as CheckOut;
      this.lista = data.pallets;
      console.log("pallets", data.pallets);
      this.dataSource = new MatTableDataSource(data.pallets);
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
}
