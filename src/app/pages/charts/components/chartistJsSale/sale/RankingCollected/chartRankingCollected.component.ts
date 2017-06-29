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
  active: boolean;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();

  constructor(
    private _chartRankingCollectedService: ChartRankingCollectedService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    this.value = 5;
    //this.data = this._chartRankingCollectedService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingCollectedService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingCollectedService.getProduct(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.data = this._chartRankingCollectedService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
