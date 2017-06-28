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
  constructor(
    private _chartRankingCustomerService: ChartRankingCustomerService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    //this.data = this._chartRankingCustomerService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingCustomerService.getResponsive(padding, offset);
  }
  showId(event): void {
    if (event.id !== null) {
      this.customer_id = event.id;
    }
  }
  onSubmit(f: NgForm) {
    this.active = false;
    if (this.customer_id === null) {
      alert("Debe elegir un proveedor");
    }
    let form = JSON.stringify({
      start: f.value.start,
      end: f.value.end,
      k: f.value.k,
      id: this.customer_id,
    });
    const filter = JSON.parse(form);
    this._chartRankingCustomerService.getCustomers(filter).subscribe(
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
