import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingProductService } from './chartRankingProduct.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProduct.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProduct {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingProductService: ChartRankingProductService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingProductService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProductService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingProductService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingProductService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
