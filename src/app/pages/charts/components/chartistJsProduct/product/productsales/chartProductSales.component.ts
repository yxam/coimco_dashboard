import { Component, OnInit } from '@angular/core';

import { ChartProductSalesService } from './chartProductSales.services';

@Component({
  selector: 'chartproduct-sales',
  templateUrl: './chartProductSales.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartProductSales implements OnInit {
  data: any;
  constructor (private _chartProductSalesService: ChartProductSalesService) {

  }
  ngOnInit() {
    this.data = this._chartProductSalesService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartProductSalesService.getResponsive(padding, offset);
  }
}
