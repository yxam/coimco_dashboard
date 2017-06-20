import { Injectable } from '@angular/core';

import { BaThemeConfigProvider } from '../../../../../../theme';

@Injectable()
export class ChartProviderPriceService {

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

  constructor(private _baConfig: BaThemeConfigProvider) {
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
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 1200px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 600px)', {
        chartPadding: 0,
        labelOffset: 0,
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }]
    ];
  }
}
