import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingCustomerService } from './chartRankingCustomer.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
import {MdButtonModule} from '@angular/material';
@Component({
  selector: 'chartBest-Product',
  templateUrl: './chartRankingCustomer.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartRankingCustomer {
  data: any;
  dbdata: any;
  customer_id: any;
  active: boolean;
  category_default: string;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  constructor(
    private _chartRankingCustomerService: ChartRankingCustomerService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    this.value = 5;
    this.category_default = 'Accesorios';
    //this.data = this._chartRankingCustomerService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingCustomerService.getResponsive(padding, offset);
  }

  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingCustomerService.getCustomers(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingCustomerService.setData(this.dbdata);
        this.active = true;

      },
      err => {
        console.log(err)
      });
  }
}
