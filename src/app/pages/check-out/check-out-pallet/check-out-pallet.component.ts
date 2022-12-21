
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CheckOutSave } from '../../../models/check-out/CheckOutSave';
import { Pallet } from '../../../models/pallet/pallet';
import { CheckOutService } from '../../../services/check-out/check-out.service';



@Component({
  selector: 'ngx-check-out-pallet',
  templateUrl: './check-out-pallet.component.html',
  styleUrls: ['./check-out-pallet.component.scss']
})
export class CheckOutPalletComponent implements OnInit   {
  map = new Map();
  message:string;
  disabled :boolean = false;
  result:any;
  constructor(
    private  checkOutService:CheckOutService,
    private  dialogRef: MatDialogRef<CheckOutPalletComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private router:Router){

  }
  ngOnInit(): void {
  this.map =  this.editData[0];
  this.result =  this.editData[1];



  if (this.map.size>1){
    this.message = "Se encontraron pallets con distinta remision, favor de validar.";
  }else {
    this.message = "Pallets seleccionados.";
    this.disabled = true;
  }
  }
  guardar(){
    let checkOutSave:CheckOutSave = new CheckOutSave();
    checkOutSave.id =  this.result[0].checkOutId;
    checkOutSave.checkListId = this.result[0].checkListId;

    this.result.map(a =>{
      let pallet:Pallet = a.pallet as Pallet;
      checkOutSave.palletsOut.push(pallet);

    })



    this.checkOutService.saveOut(checkOutSave).subscribe(data =>{

      this.dialogRef.close("true");
      this.router.navigate(['pages/checkout/checkout']);

    })

  }
}
