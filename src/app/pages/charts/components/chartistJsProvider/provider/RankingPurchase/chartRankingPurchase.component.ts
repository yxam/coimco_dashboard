import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingPurchaseService } from './chartRankingPurchase.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingPurchase.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingPurchase {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingPurchaseService: ChartRankingPurchaseService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingPurchaseService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingPurchaseService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingPurchaseService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingPurchaseService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
