import {Component} from '@angular/core';

import {chartistJsProviderService} from './chartistJsProvider.service';

@Component({
  selector: 'chartist-js',
  templateUrl: './chartistJsProvider.html',
  styleUrls: ['./chartistJsProvider.scss']
})

export class chartistJsProvider {

  data: any;

  constructor(private _chartistJsProviderService: chartistJsProviderService) {
  }

  ngOnInit() {
    this.data = this._chartistJsProviderService.getAll();
  }

  getResponsive(padding, offset) {
    return this._chartistJsProviderService.getResponsive(padding, offset);
  }
}
