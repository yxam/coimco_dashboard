import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingCustomerService } from './chartRankingCustomer.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartBest-Product',
  templateUrl: './chartRankingCustomer.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartRankingCustomer {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingCustomerService: ChartRankingCustomerService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingCustomerService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingCustomerService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingCustomerService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingCustomerService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
