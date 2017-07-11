/**
* Component de BestSeller
*/

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartBestSellerService } from './chartBestSeller.services';
import { MdButtonModule } from '@angular/material';
import 'hammerjs';


@Component({
  selector: 'chartbest-seller',
  templateUrl: './chartBestSeller.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartBestSeller {
  data: any;
  dbdata: any;
  active: boolean;
  category_default: string;
  value: number;
  start = new Date('2015/01/01');
  end = Date.now();
  categories = [
    { value: 'Accesorios', viewValue: 'Accesorios' },
    { value: 'Conectividad', viewValue: 'Conectividad' },
    { value: 'Servidores', viewValue: 'Servidores' },
    { value: 'Computadores', viewValue: 'Computadores' },
    { value: 'Almacenamiento', viewValue: 'Almacenamiento' },
    { value: 'Gabinetes', viewValue: 'Gabinetes' },
    { value: 'Racks', viewValue: 'Racks' },
  ];
  constructor(
    private _chartBestSellerService: ChartBestSellerService) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.value = 5;
    this.category_default = 'Accesorios';
    //this.data = this._chartBestSellerService.getAll();
    this.active = false;
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartBestSellerService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartBestSellerService.getSeller(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartBestSellerService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }
}
