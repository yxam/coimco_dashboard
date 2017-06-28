import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartBestProductService } from './chartBestProduct.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartBest-Product',
  templateUrl: './chartBestProduct.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartBestProduct {
  data: any;
  dbdata: any;

  active: boolean;
  constructor(
    private _chartBestProductService: ChartBestProductService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    //this.data = this._chartRankingProviderCategoryService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartBestProductService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartBestProductService.getCustomer(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartBestProductService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
