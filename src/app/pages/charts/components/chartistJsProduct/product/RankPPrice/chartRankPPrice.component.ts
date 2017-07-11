/**
* Component de RankPPrice
*/
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { ChartRankPPriceService } from './chartRankPPrice.service';
import { AutocompleteOverviewProduct } from './../../../searcher/product/searcherProduct.component';

@Component({
  selector: 'chartRankPPrice',
  templateUrl: './chartRankPPrice.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartRankPPrice implements OnInit {
  data: any;
  products: any;
  active: boolean;
  dbdata: any;
  product_id: any;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  constructor(private _ChartRankPPriceService: ChartRankPPriceService) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    //this.data = this._ChartRankPPriceService.getAll();
    this.active = false;
    this._ChartRankPPriceService.getProductsDb()
      .subscribe(
      data => {
        this.products = data;
      }
      )
  }
  /**
  * Método donde se obtiene el id del producto que se desea consultar.
  * @param event variable que se envía desde component AutocompleteOverviewCustomer
  */
  showId(event): void {
    if (event.id !== null) {
      this.product_id = event.id;
    }
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    if (this.product_id == null) {
      alert('Debe ingresar un producto');
      return;
    }

    let form = JSON.stringify({
      start: f.value.start,
      end: f.value.end,
      k: f.value.k,
      id: this.product_id
    });
    const filter = JSON.parse(form);
    this._ChartRankPPriceService.getPrices(filter)
      .subscribe(
      data => {
        this.dbdata = data['data'];

        this.data = this._ChartRankPPriceService.setData(this.dbdata);
        this.active = true;
      },
      err => { console.log(err) }
      );
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._ChartRankPPriceService.getResponsive(padding, offset);

  }
}
