import { Component, OnInit } from '@angular/core';

import { ChartProductPriceService } from './chartProductPrice.services';

@Component({
  selector: 'chartProduct-price',
  templateUrl: './chartProductPrice.html',
  styleUrls: ['./../../chartistJS.scss'],
})

export class ChartProductPrice implements OnInit {
  data: any;
  constructor(private _chartProductPriceService: ChartProductPriceService ) {

  }
  ngOnInit() {
    this.data = this._chartProductPriceService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartProductPriceService.getResponsive(padding, offset);

  }
}
