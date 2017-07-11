/**
* Component de RankingSale
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingSaleService } from './chartRankingSale.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingSale',
  templateUrl: './chartRankingSale.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingSale {
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  value: number;
  constructor(
    private _chartRankingSaleService: ChartRankingSaleService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.active = false;
    this.value = 5;
    //this.data = this._chartRankingSaleService.getAll();
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartRankingSaleService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingSaleService.getCustomers(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingSaleService.setData(this.dbdata);
        this.active = true;

      },
      err => {
        console.log(err)
      });
  }
}
