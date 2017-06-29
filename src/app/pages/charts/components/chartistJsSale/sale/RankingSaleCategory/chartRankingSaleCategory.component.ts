import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingSaleCategoryService } from './chartRankingSaleCategory.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingSaleCategory',
  templateUrl: './chartRankingSaleCategory.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingSaleCategory {
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  constructor(
    private _chartRankingSaleCategoryService: ChartRankingSaleCategoryService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    //this.data = this._chartRankingSaleCategoryService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingSaleCategoryService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingSaleCategoryService.getCustomers(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingSaleCategoryService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
