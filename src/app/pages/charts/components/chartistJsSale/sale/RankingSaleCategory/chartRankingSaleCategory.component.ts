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
  constructor(
    private _chartRankingSaleCategoryService: ChartRankingSaleCategoryService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.data = this._chartRankingSaleCategoryService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingSaleCategoryService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankingSaleCategoryService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartRankingSaleCategoryService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
