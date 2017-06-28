import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingSaleBrandService } from './chartRankingSaleBrand.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingSaleBrand',
  templateUrl: './chartRankingSaleBrand.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingSaleBrand {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingSaleBrandService: ChartRankingSaleBrandService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingSaleBrandService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingSaleBrandService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingSaleBrandService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingSaleBrandService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
