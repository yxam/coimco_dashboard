/**
* Services de component RankingSale
*/
import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChartRankingSaleService {
  private dbdata: Observable<JSON[]>
  private products: JSON[] = [];
  private errorMessage: any;
  private _data = {
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
          return (value / 1000000) + 'M';
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
    return this._data;
  }
  /**
  *Método que envía filtro a services que contiene llamadas a API.
  *@param filter Objeto JSON el cuál contiene fecha y 'k'.
  *@returns Observable del request a API.
  */
  getCustomers(filter: JSON): any {
    //Retorna el observable de la data
    return this._chartAPI.getRankingSale(filter);
  }
  /**
  *Función encargada de remover todos los datos actuales del gráfico
  */
  removeData() {
    this._data.stackedBarData.labels.splice(0);
    this._data.stackedBarData.series.splice(0);
    console.log(this._data);
  }
  /**
  * Método encargado de setear los datos enviados desde la API para asignarlos al gráfico.
  * @param Arreglo de JSON los cuales son la información envíada desde la API.
  * @return Objeto que contiene información del gráfico y cuál se utilizará.
  */
  setData(dbdata: Array<JSON>) {
    this.removeData();
    let list: string[] = [];
    console.log(dbdata);
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    let data_chart: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const data_db = JSON.parse(list[i]);
      const nameProvider = data_db.Name;
      const cash = data_db.Cash;
      const label = nameProvider;

      this._data.stackedBarData.labels.push(label);
      let data_series: any[] = [];
      //Para que tengan color distintos, ASI ESTA CONSTRUIDO EL GRAFICO, MÁS INFORMACIÓN VER ARCHIVO chartistJsProduct.services.ts y pagina de akveo
      for (let j = 0; j < list.length; j++) {
        if (j == i) {
          data_series[j] = cash;
        } else {
          data_series[j] = 0;
        }
      }
      this._data.stackedBarData.series.push(data_series);
    }
    console.log(this._data);
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
