import { Injectable, OnInit } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Data_pieChart } from './data_pieChart.service';

@Injectable()
export class PieChartService {
  dbdata: JSON[]= [];
  products: JSON[]= [];
  errorMessage: any;
  private searchTerms= new Subject<string>();
  constructor(
     private _baConfig: BaThemeConfigProvider,
     private data_pieChart: Data_pieChart) {}

  getData() {
    const pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    this.data_pieChart.getData()
                      .subscribe(data => this.dbdata = data,
                                 error => this.errorMessage = <any>error,
                                  () => console.log(this.dbdata)) ;
    console.log(this.dbdata);
    console.log(this.errorMessage);

    return [
      {
        color: pieColor,
        description: 'dashboard.all_sales',
        stats: '$ 1.120',
        icon: 'money',
        denied_acces: '-',
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
