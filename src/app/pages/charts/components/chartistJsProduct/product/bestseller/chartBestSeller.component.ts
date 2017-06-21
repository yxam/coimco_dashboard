import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartBestSellerService } from './chartBestSeller.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartbest-seller',
  templateUrl: './chartBestSeller.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartBestSeller {
  data: any;

  constructor (
    private _chartBestSellerService: ChartBestSellerService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit(){
    this.data = this._chartBestSellerService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartBestSellerService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    const aux = this._chartBestSellerService.getSeller(f.value);

    console.log(aux);

  }
}
