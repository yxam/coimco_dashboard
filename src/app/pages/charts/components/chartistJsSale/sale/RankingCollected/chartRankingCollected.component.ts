/**
* Component de chartRankingCollected
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingCollectedService } from './chartRankingCollected.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingCollected',
  templateUrl: './chartRankingCollected.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingCollected {
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();

  constructor(
    private _chartRankingCollectedService: ChartRankingCollectedService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.active = false;
    this.value = 5;
    //this.data = this._chartRankingCollectedService.getAll();
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartRankingCollectedService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingCollectedService.getProduct(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.data = this._chartRankingCollectedService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
