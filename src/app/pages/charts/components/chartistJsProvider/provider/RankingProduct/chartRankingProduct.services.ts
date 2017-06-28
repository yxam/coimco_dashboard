import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartRankingProductService {
  private dbdata: Observable<JSON[]>
  private products: JSON[] = [];
  private errorMessage: any;
  private _data = {
    stackedBarData: {
      labels: [],
      series: [],
    },
    stackedBarOptions: {
      fullWidth: true,
      height: '400px',
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 1000);
        }
      }
    },

  };
  private dataSeller: JSON[] = [];

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }
  getInfoProvider(filter: JSON): any {
    return this._chartAPI.getRankProviderP(filter);
  }
  removeData() {
    this._data.stackedBarData.labels.splice(0);
    this._data.stackedBarData.series.splice(0);
    console.log(this._data);
  }
  setData(dbdata: Array<JSON>) {
    this.removeData();
    let list: string[] = [];
    console.log(dbdata);
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    let data_chart: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const data_db = JSON.parse(list[i]);
      const nameProvider = data_db.Name;
      const quantity = data_db.Quantity;
      const label = nameProvider;

      this._data.stackedBarData.labels.push(label);
      let data_series: any[] = [];
      //Para que tengan color distintos, ASI ESTA CONSTRUIDO EL GRAFICO, MÁS INFORMACIÓN VER ARCHIVO chartistJsProduct.services.ts y pagina de akveo
      for (let j = 0; j < list.length; j++) {
        if (j == i) {
          data_series[j] = quantity;
        } else {
          data_series[j] = 0;
        }
      }
      this._data.stackedBarData.series.push(data_series);
    }
    return this._data;
  }

  getAll() {
    return this._data;
  }


  printDATA(data: any) {
    console.log(data);
  }
  getData() {
    return this.dataSeller;
  }

  getResponsive(padding, offset) {
    return [
      ['screen and (max-width: 1024px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        chartPadding: 30,
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
