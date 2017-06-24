import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartRankCategoryService {
  private dbdata: Observable<JSON[]>;
  private _data = {
    stackedBarData: {
      labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4', 'Quarter 5'],
      series: [
        [800000, 1200000, 1400000, 4020000, 300000],

      ],
    },
    stackedBarOptions: {
      fullWidth: true,
      height: '300px',
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 1000) + 'k';
        }
      }
    },

  };
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
    console.log(dbdata);
    let list: string[] = [];
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    console.log(list);
    let data_chart: string[] = [];
    for (let i = 0; i < list.length; i++) {
      let data_db = JSON.parse(list[i]);
      let name = data_db.Name;
      let total = data_db.Total;
      console.log(data_db.Total);
      this._dataCategory.stackedBarData.labels.push(name);
      data_chart.push(total);

      this._dataCategory.stackedBarData.series.push(data_chart);
    }

    console.log(this._dataCategory);
    return this._dataCategory;
  }

  getAll() {
    return this._data;
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
