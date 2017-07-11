/**
* Services de component BestSeller
*/

import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';
import { BaThemeConfigProvider, colorHelper } from '../../../../../../theme';

@Injectable()
export class ChartBestSellerService {
  private dbdata: any;
  private products: JSON[] = [];
  private errorMessage: any;
  private data_traffic: Array<Object>;

  private _dataSeller = {
    simpleDonutData: {
      labels: [],
      series: [],
    },
    simpleDonutOptions: {
      fullWidth: true,
      donut: true,
      height: '450px',
      weight: '450px',
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value[0];
      }
    }

  };


  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _chartAPI: ChartsAPI) {
  }
  /**
  *Función encargada de remover todos los datos actuales del gráfico
  */
  removeData() {
    this._dataSeller.simpleDonutData.labels.splice(0);
    this._dataSeller.simpleDonutData.series.splice(0);
  }

  /**
  *Método que envía filtro a services que contiene llamadas a API.
  *@param filter Objeto JSON el cuál contiene fecha y 'k'.
  *@returns Observable del request a API.
  */
  getSeller(filter: JSON): any {

    return this._chartAPI.getBestSeller(filter);
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
      const data_db = JSON.parse(list[i]);
      const name = data_db.name;
      const sales = data_db.Cant;
      this._dataSeller.simpleDonutData.labels.push(name + " Cantidad: " + sales);
      this._dataSeller.simpleDonutData.series.push(sales);
    }
    console.log(this._dataSeller);
    return this._dataSeller;


  }


  getResponsive(padding, offset) {
    return [
      ['screen and (min-width: 640px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: padding,
        chartPadding: offset
      }]
    ];
  }
  /*
  setData(data: Array<JSON>) {
    const dashboardColors = this._baConfig.get().colors.dashboard;

    this.dbdata = data;
    const list: string[] = [];
    this.dbdata.forEach(variable =>
      list.push(JSON.stringify(variable))
    );
    let data_chart: JSON[] = [];
    let data_aux: any[] = [];
    let key: any[] = [];
    for (let p in dashboardColors) {
      key.push(p);
    }
    for (let i = 0; i < list.length; i++) {
      data_chart.push(JSON.parse(list[i]));
      const object1 = {
        value: data_chart[i]['category'],
        color: dashboardColors[key[i]],
        highlight: colorHelper.shade(dashboardColors[key[i]], 15),
        label: data_chart[i]['name'],
        percentage: 87,
        order: i,
      };
      //const aux = JSON.parse(object1);
      data_aux.push(object1);
    }
    this.data_traffic = data_aux;
    return this.data_traffic;

  }*/

}
