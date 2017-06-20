import { Component } from '@angular/core';

import { ChartProductSalesService } from './chartProductSales.services';

@Component({
  selector: 'chartproduct-sales',
  templateUrl: './chartProductSales.html',
  styleUrls: ['./../../chartistJS.scss'],
})

export class ChartProductSales{
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
