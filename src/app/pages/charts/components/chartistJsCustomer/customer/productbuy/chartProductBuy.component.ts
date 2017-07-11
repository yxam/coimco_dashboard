/**
* Component de ProductBuy
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartProductBuyService } from './chartProductBuy.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { AutocompleteOverviewCustomer } from './../../../searcher/customer/searcherCustomer.component';
@Component({
  selector: 'chartproduct-buy',
  templateUrl: './chartProductBuy.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartProductBuy {
  data: any;
  dbdata: any;
  customer_id: any;
  active: boolean;
  constructor(
    private _chartProductBuyService: ChartProductBuyService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.active = false;
    //this.data = this._chartRankingProviderCategoryService.getAll();
  }
  /**
  * Método donde se obtiene el id del customer que se desea consultar.
  * @param event variable que se envía desde component AutocompleteOverviewCustomer
  */
  showId(event): void {
    if (event.id !== null) {
      this.customer_id = event.id;
    }
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartProductBuyService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    if (this.customer_id === null) {
      alert("Debe elegir un proveedor");
    }
    let form = JSON.stringify({
      start: f.value.start,
      end: f.value.end,
      id: this.customer_id,
    });
    const filter = JSON.parse(form);
    this._chartProductBuyService.getCustomers(filter).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartProductBuyService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
