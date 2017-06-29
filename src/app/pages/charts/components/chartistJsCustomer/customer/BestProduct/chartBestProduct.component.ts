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
  value: number;
  category_default: string;
  startDate = new Date('2015/01/01');
  endDate = Date.now();

  active: boolean;
  constructor(
    private _chartBestProductService: ChartBestProductService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    this.value = 5;
    //this.data = this._chartRankingProviderCategoryService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartBestProductService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    console.log(f.value);
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
