import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingSaleService } from './chartRankingSale.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingSale',
  templateUrl: './chartRankingSale.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingSale {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingSaleService: ChartRankingSaleService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingSaleService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingSaleService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingSaleService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingSaleService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
