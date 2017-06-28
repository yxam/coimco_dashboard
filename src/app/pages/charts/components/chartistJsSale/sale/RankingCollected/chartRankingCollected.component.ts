import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingCollectedService } from './chartRankingCollected.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingCollected',
  templateUrl: './chartRankingCollected.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingCollected {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingCollectedService: ChartRankingCollectedService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingCollectedService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingCollectedService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingCollectedService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingCollectedService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
