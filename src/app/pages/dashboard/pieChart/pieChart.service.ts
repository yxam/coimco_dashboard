import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Data_pieChart} from './data_pieChart.service';
@Injectable()
export class PieChartService {
data: any;
  constructor ( private _baConfig: BaThemeConfigProvider, private data_pieChart: Data_pieChart) {

  }
getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    this.data=this.data_pieChart.getData();
    console.log(this.data );
    return [
      {
        color: pieColor,
        description: 'dashboard.all_sales',
        stats: '$ 1.120',
        icon: 'money',
        denied_acces : '-',
      }, {
        color: pieColor,
        description: 'dashboard.all_purchases',
        stats: '$ 901',
        icon: 'money',
        denied_acces: '0',
      }, {
        color: pieColor,
        description: 'dashboard.last_sale',
        stats: '91',
        icon: 'refresh',
        denied_acces: '-',
      }, {
        color: pieColor,
        description: 'dashboard.last_purchase',
        stats: '12.232.592',
        icon: 'money',
        denied_acces: '0',
      },
    ];
  }
}
