import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'ngx-check-list-pallet-close',
  templateUrl: './check-list-pallet-close.component.html',
  styleUrls: ['./check-list-pallet-close.component.scss']
})
export class CheckListPalletCloseComponent implements OnInit{

  contentDelete:string;
  message:string;
  disabled:boolean = true;
  constructor(

    private  dialogRef: MatDialogRef<CheckListPalletCloseComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any) {}

  ngOnInit(): void {
    this.contentDelete = this.editData;
    this.message = "Seguro que deseas finalizar la remision : " + this.contentDelete + " ?";

  }

  closeRemision(){
    this.dialogRef.close("true");
  }

}
