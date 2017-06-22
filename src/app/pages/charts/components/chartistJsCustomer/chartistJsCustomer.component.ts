import {Component} from '@angular/core';

import {chartistJsProductService} from './chartistJsProduct.service';

@Component({
  selector: 'chartist-js',
  templateUrl: './chartistJsProduct.html',
  styleUrls: ['./chartistJsProduct.scss']
})

export class chartistJsCustomer {

  data: any;

  constructor(private _chartistJsProductService: chartistJsProductService) {
  }

  ngOnInit() {
    this.data = this._chartistJsProductService.getAll();
  }

  getResponsive(padding, offset) {
    return this._chartistJsProductService.getResponsive(padding, offset);
  }
}
