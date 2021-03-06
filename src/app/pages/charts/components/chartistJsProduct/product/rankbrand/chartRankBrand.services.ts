/**
* Services de component BestProduct
*/
import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ChartRankBrandService {
  private dbdata: Observable<JSON[]>;
  private data_entry: any[] = [];
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
      series: []
    },
    simpleBarOptions: {
      fullWidth: true,
      height: '500px'
    },

  };

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }
  /**
  *Función encargada de remover todos los datos actuales del gráfico
  */
  removeData() {
    this._dataBrand.simpleBarData.labels.splice(0);
    this._dataBrand.simpleBarData.series.splice(0);
    console.log(this._dataBrand);
  }
  /**
  * Método encargado de setear los datos enviados desde la API para asignarlos al gráfico.
  * @param Arreglo de JSON los cuales son la información envíada desde la API.
  * @return Objeto que contiene información del gráfico y cuál se utilizará.
  */
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
      this._dataBrand.simpleBarData.labels.push(name);
      data_chart.push(total);
    }
    this._dataBrand.simpleBarData.series.push(data_chart);
    console.log(this._dataBrand);
    return this._dataBrand;

  }
  getAll() {
    return this._data;
  }
  /**
  *Método que envía filtro a services que contiene llamadas a API.
  *@param filter Objeto JSON el cuál contiene fecha y 'k'.
  *@returns Observable del request a API.
  */
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
