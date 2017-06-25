import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingPurchaseCategoryService } from './chartRankingPurchaseCategory.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingPurchaseCategory.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingPurchaseCategory {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingPurchaseCategoryService: ChartRankingPurchaseCategoryService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingPurchaseCategoryService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingPurchaseCategoryService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingPurchaseCategoryService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingPurchaseCategoryService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
