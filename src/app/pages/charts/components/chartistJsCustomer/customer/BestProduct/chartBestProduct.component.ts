/**
* Component de BestProduct
*/

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartBestProductService } from './chartBestProduct.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartBest-Product',
  templateUrl: './chartBestProduct.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartBestProduct {
  data: any;
  dbdata: any;
  value: number;
  category_default: string;
  startDate = new Date('2015/01/01');
  endDate = Date.now();

  active: boolean;
  constructor(
    private _chartBestProductService: ChartBestProductService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.active = false;
    this.value = 5;
    //this.data = this._chartRankingProviderCategoryService.getAll();
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartBestProductService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartBestProductService.getCustomer(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartBestProductService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
