import { Component, OnInit } from '@angular/core';

import { ChartProviderPriceService } from './chartProviderPrice.services';

@Component({
  selector: 'chartProvider-price',
  templateUrl: './chartProviderPrice.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartProviderPrice implements OnInit {
  data: any;
  constructor(private _chartProviderPriceService: ChartProviderPriceService) {

  }
  ngOnInit() {
    this.data = this._chartProviderPriceService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartProviderPriceService.getResponsive(padding, offset);

  }
}
