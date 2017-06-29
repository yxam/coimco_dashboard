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
  active: boolean;
  constructor(
    private _chartRankingSaleService: ChartRankingSaleService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    //this.data = this._chartRankingSaleService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingSaleService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingSaleService.getCustomers(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingSaleService.setData(this.dbdata);
        this.active = true;

      },
      err => {
        console.log(err)
      });
  }
}
