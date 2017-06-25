import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartCollectedService } from './chartCollected.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartproduct-buy',
  templateUrl: './chartCollected.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartCollected {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartCollectedService: ChartCollectedService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartCollectedService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartCollectedService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartCollectedService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartCollectedService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
