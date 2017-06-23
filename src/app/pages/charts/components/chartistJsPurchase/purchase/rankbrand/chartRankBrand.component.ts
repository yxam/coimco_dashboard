import { Component, OnInit } from '@angular/core';

import { ChartRankBrandService } from './chartRankBrand.services';

@Component({
  selector: 'chartrank-category',
  templateUrl: './chartRankBrand.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartRankBrand implements OnInit {
  data: any;
  constructor(private _chartRankBrandService: ChartRankBrandService) {
    this.data= this._chartRankBrandService.getAll();
  }
  ngOnInit() {}

  getResponsive(padding, offset) {
    return this._chartRankBrandService.getResponsive(padding, offset);
  }
}
