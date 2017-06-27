import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartProductBuyService } from './chartProductBuy.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { AutocompleteOverviewCustomer } from './../../../searcher/customer/searcherCustomer.component';
@Component({
  selector: 'chartproduct-buy',
  templateUrl: './chartProductBuy.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartProductBuy {
  data: any;
  dbdata: any;
  customer_id: any;
  active: boolean;
  constructor(
    private _chartProductBuyService: ChartProductBuyService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    //this.data = this._chartRankingProviderCategoryService.getAll();
  }
  showId(event): void {
    if (event.id !== null) {
      this.customer_id = event.id;
    }
  }
  getResponsive(padding, offset) {
    return this._chartProductBuyService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    if (this.customer_id === null) {
      alert("Debe elegir un proveedor");
    }
    let form = JSON.stringify({
      start: f.value.start,
      end: f.value.end,
      id: this.customer_id,
    });
    const filter = JSON.parse(form);
    this._chartProductBuyService.getCustomers(filter).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartProductBuyService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
