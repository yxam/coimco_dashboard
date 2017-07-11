/**
* Component de Frequency en customers
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartFrequencyService } from './chartFrequency.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartproduct-buy',
  templateUrl: './chartFrequency.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartFrequency {
  data: any;
  dbdata: any;
  active: boolean;
  category_default: string;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  dataCustomer: any;
  constructor(
    private _chartFrequencyService: ChartFrequencyService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página, se encarga de inicializar datos por defecto del formulario
  */
  ngOnInit() {
    this.value = 5;
    this.category_default = 'Accesorios';
    this.active = false;
    //this.data = this._chartFrequencyService.getAll();
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartFrequencyService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartFrequencyService.getCustomers(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.dataCustomer = this._chartFrequencyService.setData(this.dbdata);
        this.active = true;

      },
      err => {
        console.log(err)
      });
  }
}
