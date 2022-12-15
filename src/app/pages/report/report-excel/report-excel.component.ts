import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../services/report/report.service';
import { saveAs } from 'file-saver';
import { HeadService } from '../../../services/head/head.service';
@Component({
  selector: 'ngx-report-excel',
  templateUrl: './report-excel.component.html',
  styleUrls: ['./report-excel.component.scss']
})
export class ReportExcelComponent implements OnInit {
  searchForm !: FormGroup;
  submitted = false;
  loading = false;
  fechaVisible:boolean=false;
  actionBtn: String = "Descargar";
  options: string[] = ['TODOS','FECHA'];
  option;
  clientName =  this.headService.getClientLS();
  constructor(private formBuilder: FormBuilder, private reportService:ReportService,private headService:HeadService) { }

  ngOnInit(): void {
    this.setForm();
  }
  get f() { return this.searchForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.loading = true;
    let name :string = "Report.xls";
    if (this.option ==="TODOS"){

        this.reportService.downloadReportIn(this.clientName).subscribe(data =>{
          const blob =new Blob([data],{type: "application/excel"});
        saveAs(blob, name);
        this.loading = false;
        });


    }
    if (this.option ==="FECHA"){
      let dateBefore = this.searchForm.get('dateBefore').value;
      let dateAfter = this.searchForm.get('dateAfter').value;

      this.reportService.downloadReportDate(this.clientName,dateBefore,dateAfter).subscribe(data =>{
        const blob =new Blob([data],{type: "application/excel"});
      saveAs(blob, name);

      });
    }
    this.onReset();
    //this.modelClient(this.userForm);
    /*
    super.crear().subscribe(data =>{
        if (data){
          this.onReset();
          super.toast("success", "Usuario creado con éxito");
          this.loading = false;
        }
      });
*/

  }

  onReset() {
    this.submitted = false;
    this.searchForm.reset();
    this.searchForm.controls.dateBefore.clearValidators();
    this.searchForm.controls.dateBefore.updateValueAndValidity();
    this.searchForm.controls.dateAfter.clearValidators();
    this.searchForm.controls.dateAfter.updateValueAndValidity();
    this.fechaVisible=false;
    this.loading = false;
  }

  setForm() {
    this.searchForm = this.formBuilder.group({
      typeSearchControl: ['', Validators.required],
      dateBefore: ['',],
      dateAfter: ['',],

    });
  }

  optionSelectedTypeSearch(event){

    this.option = event.option.value;
    if (event.option.value ==="TODOS"){
      this.searchForm.controls.dateBefore.clearValidators();
      this.searchForm.controls.dateBefore.updateValueAndValidity();
      this.searchForm.controls.dateAfter.clearValidators();
      this.searchForm.controls.dateAfter.updateValueAndValidity();
      this.fechaVisible=false;
    }

    if (event.option.value ==="FECHA"){
        this.fechaVisible=true;
        this.searchForm.controls.dateBefore.addValidators(Validators.required);
        this.searchForm.controls.dateBefore.updateValueAndValidity();
        this.searchForm.controls.dateAfter.addValidators(Validators.required);
        this.searchForm.controls.dateAfter.updateValueAndValidity();
    }

  }

  displayPropertyTypeSearch(value){
    if (value) {
      return value;
    }
  }

}
