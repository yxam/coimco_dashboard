/**
* Component de RankPPrice
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartCustomerByBestService } from './chartCustomerByBest.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartCustomerByBest',
  templateUrl: './chartCustomerByBest.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartCustomerByBest {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartCustomerByBestService: ChartCustomerByBestService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.data = this._chartCustomerByBestService.getAll();
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartCustomerByBestService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartCustomerByBestService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartCustomerByBestService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
