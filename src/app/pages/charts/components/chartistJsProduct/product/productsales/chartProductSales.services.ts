import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartProductSalesService {

  private _data = {
    simpleLineData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [
        [20, 20, 12, 45, 50],
        [10, 45, 30, 14, 12],
        [34, 12, 12, 40, 50],
        [10, 43, 25, 22, 16],
        [3, 6, 30, 33, 43]
      ]
    },

  };
  private _dataSales = {
    simpleLineData: {
      labels: [],
      series: [
      ]
    },

  };

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }

  getProductsDb() {
    return this._chartAPI.getProducts();
  }
  getSales(filter: JSON): any {
    return this._chartAPI.getProductSales(filter);
  }
  removeData() {
    this._dataSales.simpleLineData.labels.splice(0);
    this._dataSales.simpleLineData.series.splice(0);
    console.log(this._dataSales);
  }

  setData(dbdata: Array<JSON>) {
    this.removeData();
    console.log(dbdata);
    let list: string[] = [];
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    console.log(list);
    let data_chart: string[] = [];
    for (let i = 0; i < list.length; i++) {
      let data_db = JSON.parse(list[i]);
      let date = data_db.Date;
      let total = data_db.Total;
      console.log("->date", date);
      console.log("->total", total);
      this._dataSales.simpleLineData.labels.push(date);
      data_chart.push(total);
    }
    this._dataSales.simpleLineData.series.push(data_chart);
    console.log(this._dataSales);
    return this._dataSales;
  }
  public getAll() {
    return this._data;
  }

  public getResponsive(padding, offset) {
    return [
      ['screen and (min-width: 1550px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (max-width: 1200px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (max-width: 600px)', {
        chartPadding: 0,
        labelOffset: 0,
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }]
    ];
  }
}
