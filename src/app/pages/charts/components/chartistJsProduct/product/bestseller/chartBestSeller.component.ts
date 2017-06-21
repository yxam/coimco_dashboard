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
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartBestSellerService: ChartBestSellerService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartBestSellerService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartBestSellerService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartBestSellerService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartBestSellerService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
