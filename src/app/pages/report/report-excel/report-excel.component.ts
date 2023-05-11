import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../services/report/report.service';
import { saveAs } from 'file-saver';
import { HeadService } from '../../../services/head/head.service';
import { NbToastrService } from '@nebular/theme';
import { ToastrService } from '../../../services/toastr/toastr.service';
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
  constructor(private formBuilder: FormBuilder, private reportService:ReportService,
    private headService:HeadService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.setForm();
  }
  get f() { return this.searchForm.controls; }

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    this.loading = true;
    let name :string = "Report.xls";



    if (this.option ==="TODOS"){
      this.reportService.downloadReportIn(this.clientName).subscribe({
          next: (data) =>{
            const blob =new Blob([data],{type: "application/excel"});
            saveAs(blob, name);
            this.toastrService.toast("success","Excel","Descarga Finalizada")
          },
          error: (err) =>{
            this.toastrService.toast("danger","Excel","Ocurrio un error")
          },
          complete: () => {
            this.submitted= false;
            this.loading = false;
            this.onReset()
          }
        });

    }
    if (this.option ==="FECHA"){
      let dateBefore = this.searchForm.get('dateBefore').value;
      let dateAfter = this.searchForm.get('dateAfter').value;

      this.reportService.downloadReportDate(this.clientName,dateBefore,dateAfter).subscribe({
        next: (data) =>{
          const blob =new Blob([data],{type: "application/excel"});
          saveAs(blob, name);
          this.toastrService.toast("success","Excel","Descarga Finalizada")
        },
        error: (err) =>{
          this.toastrService.toast("danger","Excel","Ocurrio un error")
        },
        complete: () =>{
          this.loading = false;
          this.submitted= false;
          this.onReset();
        }
      });
    }

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
    //this.submitted = true;
    this.searchForm.reset();
    this.searchForm.controls.dateBefore.clearValidators();
    this.searchForm.controls.dateBefore.updateValueAndValidity();
    this.searchForm.controls.dateAfter.clearValidators();
    this.searchForm.controls.dateAfter.updateValueAndValidity();
    this.fechaVisible=false;
   // this.loading = true;
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
