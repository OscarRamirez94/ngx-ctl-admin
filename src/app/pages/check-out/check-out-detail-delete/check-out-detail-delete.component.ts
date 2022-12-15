import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { CheckOutDeatailService } from '../../../services/check-out-detail/check-out-detail.service';

@Component({
  selector: 'ngx-check-out-detail-delete',
  templateUrl: './check-out-detail-delete.component.html',
  styleUrls: ['./check-out-detail-delete.component.scss']
})
export class CheckOutDetailDeleteComponent implements OnInit {

  constructor(

    private  dialogRef: MatDialogRef<CheckOutDetailDeleteComponent>,private nbToasterService:NbToastrService,
    @Inject(MAT_DIALOG_DATA) public editData:any, private checkOutDetailService:CheckOutDeatailService) {
    }

  ngOnInit(): void {

  }


  deleteDetail(){
    if (this.editData !=null){

      this.checkOutDetailService.delete(this.editData[0],this.editData[1]).subscribe({
        next: (v) =>{
          this.dialogRef.close("true");
        },
        error: (e) =>{
          console.error("error",e.error.status)
          this.nbToasterService.danger("Ocurrio algo inesperado","Error");
        },
        complete: () => console.info("complete")
      });
    }

  }
}
