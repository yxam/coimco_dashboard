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
  constructor(
    private _chartRankingTotalSaleService: ChartRankingTotalSaleService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingTotalSaleService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingTotalSaleService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingTotalSaleService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingTotalSaleService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
