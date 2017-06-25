import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingProviderCategoryService } from './chartRankingProviderCategory.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProviderCategory.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProviderCategory {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingProviderCategoryService: ChartRankingProviderCategoryService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingProviderCategoryService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProviderCategoryService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingProviderCategoryService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingProviderCategoryService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
