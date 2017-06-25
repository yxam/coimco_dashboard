import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartProductBuyService } from './chartProductBuy.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartproduct-buy',
  templateUrl: './chartProductBuy.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartProductBuy {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartProductBuyService: ChartProductBuyService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartProductBuyService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartProductBuyService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartProductBuyService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartProductBuyService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
