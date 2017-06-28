import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartSaleRecordService } from './chartSaleRecord.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartSaleRecord',
  templateUrl: './chartSaleRecord.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartSaleRecord {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartSaleRecordService: ChartSaleRecordService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartSaleRecordService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartSaleRecordService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartSaleRecordService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartSaleRecordService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
