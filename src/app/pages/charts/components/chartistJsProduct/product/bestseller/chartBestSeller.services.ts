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
  private dataSeller: JSON[]= [];

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }

  getAll() {
    return this._data;
  }

  getSeller(filter: JSON): any {
  this.dbdata.subscribe(
    data => {
      this._chartAPI.getBestSeller(filter).subscribe(
        data =>
      );
      console.log(data);
    }
  )
     /*
                    .subscribe(
                      data => this.dbdata = data,
                      error => console.log(error),
                      () => console.log(this.dbdata));
                      */
    console.log(this.dbdata);
    return this.dbdata;
  }
  printDATA(data: any ) {
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
