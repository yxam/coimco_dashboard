import { Component } from '@angular/core';

import { ChartBestSellerService } from './chartBestSeller.services';

@Component({
  selector: 'chartbest-seller',
  templateUrl: './chartBestSeller.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartBestSeller {
  data: any;
  constructor (private _chartBestSellerService: ChartBestSellerService){

  }
  ngOnInit(){
    this.data=this._chartBestSellerService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartBestSellerService.getResponsive(padding, offset);
  }
}
