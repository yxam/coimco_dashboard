import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartCustomerByBestService } from './chartCustomerByBest.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartCustomerByBest',
  templateUrl: './chartCustomerByBest.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartCustomerByBest {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartCustomerByBestService: ChartCustomerByBestService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartCustomerByBestService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartCustomerByBestService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartCustomerByBestService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartCustomerByBestService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
