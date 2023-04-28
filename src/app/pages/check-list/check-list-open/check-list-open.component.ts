import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'ngx-check-list-open',
  templateUrl: './check-list-open.component.html',
  styleUrls: ['./check-list-open.component.scss']
})
export class CheckListOpenComponent implements OnInit{

  contentDelete:string;
  message:string;
  disabled:boolean = false;
  constructor(

    private  dialogRef: MatDialogRef<CheckListOpenComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    headService:HeadService) {}

  ngOnInit(): void {
    this.contentDelete = this.editData.remision;
      this.disabled = true;
      this.message = "Seguro que deseas abrir la remision : " + this.contentDelete + " ?";
  }

  closeRemision(){
    this.dialogRef.close("true");
  }

}
