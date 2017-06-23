import {Component} from '@angular/core';

import {chartistJsPurchaseService} from './chartistJsPurchase.service';

@Component({
  selector: 'chartist-js',
  templateUrl: './chartistJsProduct.html',
  styleUrls: ['./chartistJsProduct.scss']
})

export class chartistJsPurchase {

  data: any;

  constructor(private _chartistJsProductService: chartistJsPurchaseService) {
  }

  ngOnInit() {
    this.data = this._chartistJsProductService.getAll();
  }

  getResponsive(padding, offset) {
    return this._chartistJsProductService.getResponsive(padding, offset);
  }
}
