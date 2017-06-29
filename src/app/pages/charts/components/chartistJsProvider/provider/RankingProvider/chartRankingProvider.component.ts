import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingProviderService } from './chartRankingProvider.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProvider.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProvider {
  data: any;
  active: boolean;
  dbdata: any;
  category_default: string;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  constructor(
    private _chartRankingProviderService: ChartRankingProviderService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    this.value = 5;
    this.category_default = 'Accesorios';
    //this.data = this._chartRankingProviderService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProviderService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingProviderService.getProvider(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.data = this._chartRankingProviderService.setData(this.dbdata);
        this.active = true;

      },
      err => {
        console.log(err)
      });
  }
}
