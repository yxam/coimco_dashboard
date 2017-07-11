/**
*Services de component ProductBuy
*/
import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';
import { AutocompleteOverviewCustomer } from './../../../searcher/customer/searcherCustomer.component';
@Injectable()
export class ChartProductBuyService {
  data: any;
  dbdata: any;
  provider_id: any;
  active: boolean;
  private errorMessage: any;
  private _data = {
    simpleDonutData: {
      labels: [],
      series: [],
    },
    simpleDonutOptions: {
      fullWidth: true,
      donut: true,
      height: '300px',
      weight: '300px',
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
  /**
  *Método que envía filtro a services que contiene llamadas a API.
  *@param filter Objeto JSON el cuál contiene fecha, 'k' y id de customer.
  *@returns Observable del request a API.
  */
  getCustomers(filter: JSON): Observable<JSON[]> {

    //Retorna el observable de la data
    return this._chartAPI.getRankProductCustomer(filter);
  }
  printDATA(data: any) {
    console.log(data);
  }


  /**
  *Función encargada de remover todos los datos actuales del gráfico
  */
  removeData() {
    this._data.simpleDonutData.labels.splice(0);
    this._data.simpleDonutData.series.splice(0);

  }
  /**
  * Método encargado de setear los datos enviados desde la API para asignarlos al gráfico.
  * @param Arreglo de JSON los cuales son la información envíada desde la API.
  * @return Objeto que contiene información del gráfico y cuál se utilizará.
  */
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
      this._data.simpleDonutData.labels.push(name);
      this._data.simpleDonutData.series.push(total);
    }
    return this._data;
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
