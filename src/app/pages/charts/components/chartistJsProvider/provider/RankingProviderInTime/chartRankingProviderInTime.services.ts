import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartRankingProviderInTimeService {
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
      height: '300px',
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 1000);
        }
      }
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

  getAll() {
    return this._data;
  }

  getProvider(filter: JSON): any {

    //Retorna el observable de la data
    return this._chartAPI.getRankProviderTime(filter);
  }
  removeData() {
    this._data.stackedBarData.labels.splice(0);
    this._data.stackedBarData.series.splice(0);
    //console.log(this._data);
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
      const name = data_db.Name;
      const price = data_db.Total;
      this._data.stackedBarData.labels.push(name);
      data_chart.push(price);
      let data_series: any[] = [];
      //Para que tengan color distintos, ASI ESTA CONSTRUIDO EL GRAFICO, MÁS INFORMACIÓN VER ARCHIVO chartistJsProduct.services.ts y pagina de akveo
      for (let j = 0; j < list.length; j++) {
        if (j == i) {
          data_series[j] = price;
        } else {
          data_series[j] = 0;
        }
      }
      this._data.stackedBarData.series.push(data_series);
    }
    //this._dataPrices.areaLineData.labels.push('');
    //this._dataPrices.areaLineData.series.push(data_chart);
    return this._data;
  }
  printDATA(data: any) {
    console.log(data);
  }
  getData() {
    return this._data;
  }

  getResponsive(padding, offset) {
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
