import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartRankingProviderCategoryService {
  private dbdata: Observable<JSON[]>
  private products: JSON[] = [];
  private errorMessage: any;
  private _data = {
    simpleDonutData: {
      labels: [],
      series: [],
    },
    simpleDonutOptions: {
      fullWidth: true,
      donut: true,
      height: '450px',
      weight: '450px',
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value[0];
      },
    },

  };
  private dataSeller: JSON[] = [];

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }

  getAll() {
    return this._data;
  }

  getProviders(filter: JSON): any {
    //Retorna el observable de la data
    return this._chartAPI.getRankProviderPP(filter);
  }
  removeData() {
    this._data.simpleDonutData.labels.splice(0);
    this._data.simpleDonutData.series.splice(0);

  }
  setData(dbdata: Array<JSON>) {
    this.removeData();
    let list: string[] = [];
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    let data_chart: string[] = [];
    console.log(dbdata);
    for (let i = 0; i < list.length; i++) {
      const data_db = JSON.parse(list[i]);
      console.log(data_db);
      const name = data_db.Name;
      const price = data_db.Price;
      this._data.simpleDonutData.labels.push(name + " Cantidad: " + price);
      this._data.simpleDonutData.series.push(price);
    }
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
