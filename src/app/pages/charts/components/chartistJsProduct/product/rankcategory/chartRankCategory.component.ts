import { Component, OnInit } from '@angular/core';

import { ChartRankCategoryService } from './chartRankCategory.services';

@Component({
  selector: 'chartrank-category',
  templateUrl: './chartRankCategory.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartRankCategory implements OnInit {
  data: any;
  constructor( private _chartRankCategory: ChartRankCategoryService) {

  }
  ngOnInit() {
    this.data = this._chartRankCategory.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankCategory.getResponsive(padding, offset);
  }
}
