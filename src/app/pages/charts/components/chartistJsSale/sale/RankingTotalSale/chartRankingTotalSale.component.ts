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
  constructor(
    private _chartRankingTotalSaleService: ChartRankingTotalSaleService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
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
