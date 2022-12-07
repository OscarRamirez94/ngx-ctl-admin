import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';


@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastrService: NbToastrService) {
  }


// config toastr
config: NbToastrConfig;
destroyByClick = true;
duration = 5000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
preventDuplicates = false;

positions: string[] = [
  NbGlobalPhysicalPosition.TOP_RIGHT,
  NbGlobalPhysicalPosition.TOP_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  NbGlobalLogicalPosition.TOP_END,
  NbGlobalLogicalPosition.TOP_START,
  NbGlobalLogicalPosition.BOTTOM_END,
  NbGlobalLogicalPosition.BOTTOM_START,
];



private showToast(status:string,tittle:String, body: string) {
  const config = {
    status: status,
    tittle: tittle,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };

  this.toastrService.show(body,tittle,config);
}

  public toast(status:string, tittle:String, content:string){
    this.showToast(status, tittle, content);
  }
}
