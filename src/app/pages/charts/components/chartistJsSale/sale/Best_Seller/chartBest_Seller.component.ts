/**
* Component de Best_Seller
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartBest_SellerService } from './chartBest_Seller.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartBest_Seller',
  templateUrl: './chartBest_Seller.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartBest_Seller {
  data: any;
  dbdata: any;
  datos_aux: any;
  constructor(
    private _chartBest_SellerService: ChartBest_SellerService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.data = this._chartBest_SellerService.getAll();
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartBest_SellerService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartBest_SellerService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'][0].ID;
        console.log(this.dbdata);
        this.datos_aux = this._chartBest_SellerService.getAll();

      },
      err => {
        console.log(err)
      });
  }
}
