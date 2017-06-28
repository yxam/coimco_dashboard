import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartRankCategoryService {
  private dbdata: Observable<JSON[]>;

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

          return value;
        }
      }
    },

  };
  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }

  removeData() {
    this._dataCategory.stackedBarData.labels.splice(0);
    this._dataCategory.stackedBarData.series.splice(0);
    console.log("remove->", this._dataCategory);
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
      const name = data_db.Name;
      const total = data_db.Total;
      this._dataCategory.stackedBarData.labels.push(name);
      data_chart.push(total);

      let data_series: any[] = [];
      //Para que tengan color distintos, ASI ESTA CONSTRUIDO EL GRAFICO, MÁS INFORMACIÓN VER ARCHIVO chartistJsProduct.services.ts y pagina de akveo
      for (let j = 0; j < list.length; j++) {
        if (j === i) {
          data_series[j] = total;
        } else {
          data_series[j] = 0;
        }
      }
      this._dataCategory.stackedBarData.series.push(data_series);

    }

    console.log(this._dataCategory);
    return this._dataCategory;
  }


  getCategory(filter: JSON): any {
    return this._chartAPI.getRankCategory(filter);
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
