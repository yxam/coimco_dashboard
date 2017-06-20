import { Component, OnInit } from '@angular/core';

import { ChartProviderSalesService } from './chartProviderSales.services';

@Component({
  selector: 'chartproduct-sales',
  templateUrl: './chartProviderSales.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartProviderSales implements OnInit {
  data: any;
  constructor(private _chartProviderSalesService: ChartProviderSalesService) {

  }
  ngOnInit() {
    this.data = this._chartProviderSalesService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartProviderSalesService.getResponsive(padding, offset);
  }
}
