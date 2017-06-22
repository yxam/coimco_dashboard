import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartBestSellerService {
  private dbdata: Observable<JSON[]>
  private products: JSON[] = [];
  private errorMessage: any;
  private _data = {
    simpleDonutData: {
      labels: ['Bananas', 'Apples', 'Grapes'],
      series: [20, 15, 40],
    },

  };


  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }

  getAll() {
    return this._data;
  }

  getSeller(filter: JSON): any {

    //Retorna el observable de la data
    //return this._chartAPI.getBestSeller(filter);
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
