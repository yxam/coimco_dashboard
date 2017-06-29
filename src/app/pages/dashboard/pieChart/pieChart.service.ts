import { Injectable, OnInit } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Data_API } from './../data_API.service';

@Injectable()
export class PieChartService {
  dbdata: JSON[] = [];
  products: JSON[] = [];
  errorMessage: any;

  private searchTerms = new Subject<string>();
  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _data_pieChart: Data_API) { }

  getData() {
    const pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
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
  getDataStats(currentUser: JSON): Observable<JSON[]> {

    return this._data_pieChart.getStats(currentUser);

  }
  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  setData(dbdata: JSON) {
    //Cuando el farid tenga listo el dashboard en la api, debo cambiar de array a sólo JSON
    //const list: string[] = [];
    const data_dash: string[] = [];
    const data_db = dbdata;
    //Cuando este listo el metodo en la api se agregará esto
    const money_sale = this.numberWithCommas(data_db['Sale_Total']);
    const sale_last = this.numberWithCommas(data_db['LastSale']);
    const money_purchase = this.numberWithCommas(data_db['PurchaseTotal']);
    const purchase_last = this.numberWithCommas(data_db['LastPurchase']);


    const pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'dashboard.all_sales',
        stats: '$ ' + money_sale,
        icon: 'money',
        denied_acces: '-',
      }, {
        color: pieColor,
        description: 'dashboard.all_purchases',
        stats: '$ ' + money_purchase,
        icon: 'money',
        denied_acces: '0',
      }, {
        color: pieColor,
        description: 'dashboard.last_sale',
        stats: '$ ' + sale_last,
        icon: 'money',
        denied_acces: '-',
      }, {
        color: pieColor,
        description: 'dashboard.last_purchase',
        stats: '$ ' + purchase_last,
        icon: 'money',
        denied_acces: '0',
      },
    ];

  }


}
