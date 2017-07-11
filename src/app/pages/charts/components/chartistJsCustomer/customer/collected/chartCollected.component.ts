/**
* Component de Collected
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartCollectedService } from './chartCollected.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartproduct-buy',
  templateUrl: './chartCollected.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartCollected {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartCollectedService: ChartCollectedService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.data = this._chartCollectedService.getAll();
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartCollectedService.getResponsive(padding, offset);
  }

  onSubmit(f: NgForm) {
    this._chartCollectedService.getSeller(f.value).subscribe(
      data => {

        this.dbdata = data['data'][0].ID;

        this.datos_aux = this._chartCollectedService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
