import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartProductSalesService {
  aux = new Date();
  private _data = {
    areaLineData: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [5, 9, 7, 8, 5, 3, 5, 4],
      ],
    },
    areaLineOptions: {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: true,
    },

  };
  private _dataSales = {
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

  getProductsDb() {
    return this._chartAPI.getProducts();
  }
  getSales(filter: JSON): any {
    return this._chartAPI.getProductSales(filter);
  }
  removeData() {
    this._dataSales.areaLineData.labels.splice(0);
    this._dataSales.areaLineData.series.splice(0);
    console.log(this._dataSales);
  }

  setData(dbdata: Array<JSON>) {
    this.removeData();

    let list: string[] = [];
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });

    //let aux: Date;

    let data_chart: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const data_db = JSON.parse(list[i]);
      const date = data_db.Date;
      const aux: Date = new Date(date);
      //aux.setDate(date: 'dd-mm-aaaa');
      let fecha: any;
      aux.getDay() + '-' + aux.getMonth() + '-' + aux.getFullYear;
      if (aux.getDay() < 10 && aux.getMonth() < 10) {
        fecha = '0' + aux.getDay() + '-0' + aux.getMonth() + '-' + aux.getFullYear();
      }
      else if (aux.getDay() < 10 && aux.getMonth() > 10) {
        fecha = '0' + aux.getDay() + '-' + aux.getMonth() + '-' + aux.getFullYear();
      }
      else if (aux.getDay() > 10 && aux.getMonth() < 10) {
        fecha = aux.getDay() + '-0' + aux.getMonth() + '-' + aux.getFullYear();
      }
      else {
        fecha = aux.getDay() + '-' + aux.getMonth() + '-' + aux.getFullYear();
      }

      console.log(fecha); //aux.getDay() + '-' + aux.getMonth() + '-' + aux.getFullYear;
      const total = data_db.Total;
      this._dataSales.areaLineData.labels.push(fecha);
      data_chart.push(total);
    }
    //this._dataSales.areaLineData.labels.push("");
    //data_chart.push("");
    this._dataSales.areaLineData.series.push(data_chart);
    console.log(this._dataSales);
    return this._dataSales;
  }
  getAll() {
    return this._data;
  }

  public getResponsive(padding, offset) {
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
