import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingProductBrandService } from './chartRankingProductBrand.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingProductBrand',
  templateUrl: './chartRankingProductBrand.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingProductBrand {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingProductBrandService: ChartRankingProductBrandService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingProductBrandService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProductBrandService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingProductBrandService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingProductBrandService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
