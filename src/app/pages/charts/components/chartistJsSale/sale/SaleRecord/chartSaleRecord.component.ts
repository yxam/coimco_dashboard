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
  active: boolean;
  start: any;
  end: any;
  cash: any;
  quantity: any;
  constructor(
    private _chartSaleRecordService: ChartSaleRecordService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    //let filter= JSON.stringify(dates);
    //filter=JSON.parse(filter);
    this.start = '01-01-2017';
    this.end = '01-06-2017';

    this._chartSaleRecordService.getCash().subscribe(
      data => {
        this.dbdata = data['data'];
        this.cash = this.numberWithCommas(this.dbdata.Sum);
        this.quantity = this.numberWithCommas(this.dbdata.Count);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  getResponsive(padding, offset) {
    return this._chartSaleRecordService.getResponsive(padding, offset);
  }

}
