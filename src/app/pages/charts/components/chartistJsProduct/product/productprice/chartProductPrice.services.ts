import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ChartProductPriceService {

  private _data = {
    areaLineData: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [5, 9, 7, 8, 5, 3, 5, 4]
      ]
    },
    areaLineOptions: {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: true
    },

  };
  private _dataPrices = {
    areaLineData: {
      labels: [],
      series: [],
    },
    areaLineOptions: {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: true,
    },

  };
  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }
  removeData() {
    this._dataPrices.areaLineData.labels.splice(0);
    this._dataPrices.areaLineData.series.splice(0);
    console.log(this._dataPrices);
  }
  public getAll() {
    return this._data;
  }
  getPrices(filter: JSON) {
    return this._chartAPI.getProductPrice(filter);
  }
  getProductsDb() {
    return this._chartAPI.getProducts();
  }

  setData(dbdata: Array<JSON>) {
    this.removeData();
    let list: string[] = [];
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    let data_chart: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const data_db = JSON.parse(list[i]);
      const date = data_db.Date;
      const price = data_db.Price;
      this._dataPrices.areaLineData.labels.push(date);
      data_chart.push(price);
    }
    this._dataPrices.areaLineData.series.push(data_chart);
    return this._dataPrices;
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
