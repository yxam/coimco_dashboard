import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartBest_SellerService } from './chartBest_Seller.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartBest_Seller',
  templateUrl: './chartBest_Seller.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartBest_Seller {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartBest_SellerService: ChartBest_SellerService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartBest_SellerService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartBest_SellerService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartBest_SellerService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartBest_SellerService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
