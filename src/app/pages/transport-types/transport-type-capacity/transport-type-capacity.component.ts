import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransportCapacity } from '../../../models/transport_capacity/transport-capacity';
import { TransportType } from '../../../models/transport_type/transport-type';
import { TransportCapacityService } from '../../../services/transport-capacity/transport-capacity.service';
import { TransportTypeService } from '../../../services/transport-type/transport-type.service';
import { CommonListIdComponent } from '../../commons/common-list/common-list-id.component';
import { TransportTypeCapacityCreateComponent } from '../transport-type-capacity-create/transport-type-capacity-create.component';
import { TransportTypeCapacityDeleteComponent } from '../transport-type-capacity-delete/transport-type-capacity-delete.component';

@Component({
  selector: 'ngx-transport-type-capacity',
  templateUrl: './transport-type-capacity.component.html',
  styleUrls: ['./transport-type-capacity.component.scss']
})
export class TransportTypeCapacityComponent  extends CommonListIdComponent<TransportCapacity, TransportCapacityService> {

  name: string;
  titulo: string = "Capacidad de Transporte";
  displayedColumns: string[] = ['id', 'capacity', 'unity','isActive','actions'];
  transportTypeName:String;
  transportType:TransportType;
  id:any;
  constructor(service: TransportCapacityService, router: Router, route: ActivatedRoute,
    private dialog: MatDialog,
    toastrService: NbToastrService, private transportTypeService: TransportTypeService) {
    super(service, router, route, toastrService);
    this.model = new TransportCapacity();
    this.model.id = this.id;
    this.transportTypeName = "";

  }


  ngOnInit(): void {
    this.id =  this.route.snapshot.paramMap.get('id');
    this.model.id = this.id;
    this.getTransportType(this.id);
    super.ngOnInit();
  }


  openDialog(): void {
    console.log("envia datos" +  this.transportType)
    const dialogRef = this.dialog.open(TransportTypeCapacityCreateComponent, {

      data:[this.transportType,false]
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    });
  }

  getTransportType(id:any){
    this.transportTypeService.ver(id).subscribe(data =>{
     this.transportType= data as TransportType;
     });
   }

   editarTransportCapacity(element: any) {

    this.dialog.open(TransportTypeCapacityCreateComponent, {

      data: [this.transportType,element],

    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }

  deleteTransportCapacity(element: any) {
    this.dialog.open(TransportTypeCapacityDeleteComponent, {
      width: '25%',
      data: element
    }).afterClosed().subscribe(data => {
      if (data) {
        super.calculateRange();
      }
    })
  }
}
