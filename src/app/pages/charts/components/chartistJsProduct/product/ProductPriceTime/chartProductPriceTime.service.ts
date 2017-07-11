/**
* Services de component ProductPriceTime
*/

import { Injectable } from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { BaThemeConfigProvider } from '../../../../../../theme';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ChartProductPriceTimeService {

  private _dataPrices = {
    areaLineData: {
      labels: [],
      series: [],
    },
    areaLineOptions: {
      fullWidth: true,
      height: '300px',
      width: '1500px',
      axisX: {
        // The offset of the labels to the chart area
        offset: 50,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: 'end',
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
          x: -30,
          y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.

      },
      axisY: {
        // The offset of the labels to the chart area
        offset: 60,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: 'start',
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
          x: 0,
          y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
        type: undefined,
        // This value specifies the minimum height in pixel of the scale steps
        scaleMinSpace: 20,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: false
      },
      showPoint: true,

      low: 8000,
      showArea: true,
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
    this._dataPrices.areaLineData.labels.splice(0);
    this._dataPrices.areaLineData.series.splice(0);
  }
  /**
  *Método que envía filtro a services que contiene llamadas a API.
  *@param filter Objeto JSON el cuál contiene fecha y 'k'.
  *@returns Observable del request a API.
  */
  getProductPrice(filter: JSON) {
    return this._chartAPI.getProductPriceTime(filter);
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
      const date = data_db.Date;
      const aux: Date = new Date(date);
      let fecha: any;
      fecha = aux.toLocaleDateString();
      this._dataPrices.areaLineData.labels.push(fecha);
      data_chart.push(price);
    }
    this._dataPrices.areaLineData.series.push(data_chart);
    return this._dataPrices;
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
