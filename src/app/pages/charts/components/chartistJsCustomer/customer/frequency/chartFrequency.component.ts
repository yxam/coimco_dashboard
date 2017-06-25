import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartFrequencyService } from './chartFrequency.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartproduct-buy',
  templateUrl: './chartFrequency.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartFrequency {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartFrequencyService: ChartFrequencyService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartFrequencyService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartFrequencyService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartFrequencyService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartFrequencyService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
