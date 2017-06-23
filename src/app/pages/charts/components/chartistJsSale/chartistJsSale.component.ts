import {Component} from '@angular/core';

import {chartistJsSaleService} from './chartistJsSale.service';

@Component({
  selector: 'chartist-js',
  templateUrl: './chartistJsSale.html',
  styleUrls: ['./chartistJsSale.scss']
})

export class chartistJsSale {

  data: any;

  constructor(private _chartistJsProductService: chartistJsSaleService) {
  }

  ngOnInit() {
    this.data = this._chartistJsProductService.getAll();
  }

  getResponsive(padding, offset) {
    return this._chartistJsProductService.getResponsive(padding, offset);
  }
}
