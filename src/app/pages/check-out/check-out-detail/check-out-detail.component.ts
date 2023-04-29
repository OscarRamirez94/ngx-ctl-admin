import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { CheckOutDetail } from '../../../models/check-out-detail/check-out-detail';
import { CheckOut } from '../../../models/check-out/check-out';
import { Pallet } from '../../../models/pallet/pallet';
import { CheckOutDeatailService } from '../../../services/check-out-detail/check-out-detail.service';

@Component({
  selector: 'ngx-check-out-detail',
  templateUrl: './check-out-detail.component.html',
  styleUrls: ['./check-out-detail.component.scss']
})
export class CheckOutDetailComponent implements OnInit {

  palletForm !: FormGroup;
  submitted = false;
  actionBtn:String = "Salida";
  isChecked;
  pallet:Pallet = new Pallet();

  constructor(

    private formBuilder:FormBuilder, private  dialogRef: MatDialogRef<CheckOutDetailComponent>,private nbToasterService:NbToastrService,
    @Inject(MAT_DIALOG_DATA) public editData:any, private checkOutDetailService:CheckOutDeatailService) {
    }

  ngOnInit(): void {
    this.setForm();
    this.rejectForm(this.editData);
  }

  get f () {
    return this.palletForm.controls;
   }

  onSubmit() {
    this.submitted = true;
      // stop here if form is invalid

      if (this.palletForm.invalid) {
          return;
      }
      this.modelClient(this.palletForm);

  }

  onReset() {
    this.submitted = false;
    this.palletForm.reset();
    this.editData = null;
    this.dialogRef.close("true");

  }

  setForm() {
    let amount =this.editData[0].amount;
    this.palletForm = this.formBuilder.group({

      //^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
      //name :['',[Validators.required,RxwebValidators.alpha()]],
      id:['',Validators.required],
      checkOutId:['',Validators.required],
      amount:['', RxwebValidators.maxNumber({value:amount })],



    });
  }

  rejectForm(editData:any) {
    if (editData) {
      this.actionBtn ="Modificar";
      this.palletForm.controls['id'].setValue(editData[0].id);
      this.palletForm.controls['checkOutId'].setValue(editData[1]);

    }
  }

  editarClient() {

  }

  modelClient(palletForm:any) {
    let checkOutDetail:CheckOutDetail = new CheckOutDetail();
    let checkout:CheckOut = new CheckOut();
    let pallet:Pallet =  new Pallet();

    checkout.id = palletForm.get('checkOutId').value;
    pallet.id =  palletForm.get('id').value;
    checkOutDetail.checkOut = checkout;
    checkOutDetail.pallet = pallet;
    checkOutDetail.amount = palletForm.get('amount').value;

    this.checkOutDetailService.crear(checkOutDetail).subscribe({
      next: (v) =>{
          this.onReset();
      },
      error: (e) =>{
        console.error("error",e.error.status)
        this.nbToasterService.danger("Ocurrio algo inesperado","Error");
      },
      complete: () => console.info("complete")
    });


  }






}
