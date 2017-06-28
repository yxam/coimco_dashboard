import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingSaleProductService } from './chartRankingSaleProduct.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingSaleProduct',
  templateUrl: './chartRankingSaleProduct.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingSaleProduct {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingSaleProductService: ChartRankingSaleProductService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingSaleProductService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingSaleProductService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingSaleProductService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingSaleProductService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
