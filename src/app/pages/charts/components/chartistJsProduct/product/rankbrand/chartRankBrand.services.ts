import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ChartRankBrandService {
  private dbdata: Observable<JSON[]>
  private _data = {
    simpleBarData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8]

      ]
    },
    simpleBarOptions: {
      fullWidth: true,
      height: '300px'
    },

  };
  private _dataBrand = {
    simpleBarData: {
      labels: [],
      series: [
        [],
      ]
    },
    simpleBarOptions: {
      fullWidth: true,
      height: '300px'
    },

  };

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }
  setData(dbdata: JSON) {
    //console.log(JSON.stringify(dbdata));
    const array_data = JSON.stringify(dbdata)

    let i = 0;
    for (let entry of array_data) {
      console.log(entry);
      //i++;
    }

  }
  getAll() {
    return this._data;
  }
  getBran(filter: JSON): any {
    return this._chartAPI.getRankBran(filter);
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
