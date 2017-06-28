import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartCustomerByProductService } from './chartCustomerByProduct.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartCustomerByProduct',
  templateUrl: './chartCustomerByProduct.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartCustomerByProduct {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartCustomerByProductService: ChartCustomerByProductService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartCustomerByProductService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartCustomerByProductService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartCustomerByProductService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartCustomerByProductService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
