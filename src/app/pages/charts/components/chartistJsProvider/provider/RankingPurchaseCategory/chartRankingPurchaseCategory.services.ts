import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartRankingPurchaseCategoryService {
  private dbdata: Observable<JSON[]>
  private products: JSON[] = [];
  private errorMessage: any;
  private _dataCategory = {
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
          return (value / 1000 + 'k');
        }
      }
    },

  };
  private dataSeller: JSON[] = [];

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }

  getAll() {
    return this._dataCategory;
  }

  getPurchaseCategory(filter: JSON): any {

    //Retorna el observable de la data
    return this._chartAPI.getRankPurchaseC(filter);
  }
  removeData() {
    this._dataCategory.stackedBarData.labels.splice(0);
    this._dataCategory.stackedBarData.series.splice(0);

  }
  setData(dbdata: Array<JSON[]>) {
    this.removeData();
    let list: string[] = [];
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    console.log(list);
    let data_chart: string[] = [];
    for (let i = 0; i < list.length; i++) {
      let data_db = JSON.parse(list[i]);
      const name = data_db.Name;
      const total = data_db.Total;
      console.log(total);
      this._dataCategory.stackedBarData.labels.push(name);
      let data_series: any[] = [];
      for (let j = 0; j < list.length; j++) {
        if (j == i) {
          data_series[j] = total;
        } else {
          data_series[j] = 0;
        }
      }
      console.log(data_series);
      this._dataCategory.stackedBarData.series.push(data_series);
    }
    return this._dataCategory;
  }
  printDATA(data: any) {
    console.log(data);
  }
  getData() {
    return this.dataSeller;
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
