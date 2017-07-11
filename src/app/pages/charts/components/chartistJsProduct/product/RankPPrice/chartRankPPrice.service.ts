/**
* Services de component RankPPrice
*/
import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ChartRankPPriceService {

  private _dataPrices = {
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
  /**
  *Función encargada de remover todos los datos actuales del gráfico
  */
  removeData() {
    this._dataPrices.areaLineData.labels.splice(0);
    this._dataPrices.areaLineData.series.splice(0);
    console.log(this._dataPrices);
  }
  /**
  *Método que envía filtro a services que contiene llamadas a API.
  *@param filter Objeto JSON el cuál contiene fecha y 'k'.
  *@returns Observable del request a API.
  */
  getPrices(filter: JSON) {
    return this._chartAPI.getRankPPrice(filter);
  }
  getProductsDb() {
    return this._chartAPI.getProducts();
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
      const price = data_db.Price;
      const mail = data_db.Mail;
      const phone = data_db.Phone;
      const name = data_db.Name;
      data_chart.push(JSON.stringify({ "price": price, "mail": mail, "phone": phone, "name": name }));
    }
    return data_chart;
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
