import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingProviderInTimeService } from './chartRankingProviderInTime.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProviderInTime.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProviderInTime {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartRankingProviderInTimeService: ChartRankingProviderInTimeService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingProviderInTimeService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProviderInTimeService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingProviderInTimeService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingProviderInTimeService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
