import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'ngx-check-list-pallet-validate',
  templateUrl: './check-list-pallet-validate.component.html',
  styleUrls: ['./check-list-pallet-validate.component.scss']
})
export class CheckListPalletValidateComponent implements OnInit{

  contentDelete:string;
  message:string;
  disabled:boolean = false;
  constructor(

    private  dialogRef: MatDialogRef<CheckListPalletValidateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    headService:HeadService) {}

  ngOnInit(): void {

    this.contentDelete = this.editData.remision;
    if (this.editData.pallets.length==0){
      this.message = "Remisíon sin pallets : " + this.contentDelete + " favor de validar.!";
    }else {
      this.disabled = true;
      this.message = "Seguro que deseas finalizar la remision : " + this.contentDelete + " ?";
    }
  }

  closeRemision(){
    this.dialogRef.close("true");
  }

}
