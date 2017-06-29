import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingTotalSaleService } from './chartRankingTotalSale.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingTotalSale',
  templateUrl: './chartRankingTotalSale.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingTotalSale {
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();

  constructor(
    private _chartRankingTotalSaleService: ChartRankingTotalSaleService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    this.value = 5;
    //this.data = this._chartRankingTotalSaleService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingTotalSaleService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingTotalSaleService.getCustomer(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingTotalSaleService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
