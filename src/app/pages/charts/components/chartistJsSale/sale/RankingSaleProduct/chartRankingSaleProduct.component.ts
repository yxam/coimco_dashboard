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
  active: boolean;
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
    this.active = false;
    this._chartRankingSaleProductService.getProducts(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.datos_aux = this._chartRankingSaleProductService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
