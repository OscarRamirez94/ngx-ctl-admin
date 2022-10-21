import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CheckList } from '../../../../models/check-list/check-list';
import { Pallet } from '../../../../models/pallet/pallet';
import { PalletSave } from '../../../../models/pallet/pallet-save';
import { CheckListService } from '../../../../services/check-list/check-list.service';

@Component({
  selector: 'ngx-pallet-main',
  templateUrl: './pallet-main.component.html',
  styleUrls: ['./pallet-main.component.scss']
})
export class PalletMainComponent implements OnInit {
  palletForm !: FormGroup;

  pallets:Pallet[] =[];
  submitted = false;
  actionBtn:String = "Agregar";
  isChecked;
  checkListId;
  palletSave:PalletSave;
  checkList:CheckList;
  displayedColumns: string[] = ['noPallet','amount','um','lote','expiration','actions'];
  dataSource: MatTableDataSource<Pallet>;
  constructor(
    private activedRoute:ActivatedRoute,
    toastrService: NbToastrService,
    private formBuilder:FormBuilder,
    private checkListService : CheckListService

    ) {
      this.palletSave = new PalletSave();
   }

  ngOnInit(): void {
    this.checkListId = this.activedRoute.snapshot.paramMap.get("id");
    this.checkListService.getById(this.checkListId).subscribe(data =>{
     this.checkList = data as CheckList;
    })
    this.dataSource = new MatTableDataSource(this.pallets);
    this.setForm();
  }

  get f() { return this.palletForm.controls; }

  setForm() {
    this.palletForm = this.formBuilder.group({

      noPallet:['',Validators.required],
      amount:['',Validators.required],
      um:['',Validators.required],
      lote:['',Validators.required],
      expiration:['',Validators.required],

    });
}
onSubmit() {
  this.submitted = true;
    if (this.palletForm.invalid) {
        return;
    }
    let pallet:Pallet = new Pallet();
    pallet.noPallet =  this.palletForm.get('noPallet').value;
    pallet.amount =  this.palletForm.get('amount').value;
    pallet.lote =  this.palletForm.get('lote').value;
    pallet.um =  this.palletForm.get('um').value;
    pallet.expiration =  this.palletForm.get('expiration').value;

    this.pallets.push(pallet);
    this.dataSource = new MatTableDataSource(this.pallets);
  }

  deletePallet(pallet:Pallet){

    this.pallets = this.pallets.filter(filter => filter.noPallet !== pallet.noPallet);
    var id:number = 1;
    this.pallets.forEach(p =>{
      console.log(id, "id")
      p.noPallet = id;
      id = id + 1;
      console.log(id, "next")
    })
    console.log(this.pallets);



  this.dataSource = new MatTableDataSource(this.pallets);
  }

  public guardarPallets(){

    this.palletSave.checkListId = this.checkList.id;
    this.palletSave.palletsDTO = this.pallets;
    console.log("datos a guardar"+ JSON.stringify(this.palletSave));
    this.checkListService.savePallets(this.palletSave).subscribe(data =>{
      console.log("se registro correctamente");
    });
  }

}
