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
  active: boolean;
  constructor(
    private _chartCustomerByProductService: ChartCustomerByProductService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    //this.data = this._chartCustomerByProductService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartCustomerByProductService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartCustomerByProductService.getCustomers(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartCustomerByProductService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
