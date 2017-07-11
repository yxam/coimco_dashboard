/**
* Component de BestProduct
*/
import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { ChartProductSalesService } from './chartProductSales.services';
import { AutocompleteOverviewProduct } from './../../../searcher/product/searcherProduct.component';


@Component({
  selector: 'chartproduct-sales',
  templateUrl: './chartProductSales.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartProductSales implements OnInit {
  data: any;
  products: any;
  active: boolean;
  dbdata: any;
  product_id: any;
  startDate = new Date('2015/01/01');
  endDate = Date.now();

  constructor(private _chartProductSalesService: ChartProductSalesService) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {

    this.active = false;
    this._chartProductSalesService.getProductsDb()
      .subscribe(
      data => {
        this.products = data;
      }

      );

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
    console.log(f.value);
    console.log(f.valid);
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
    console.log(filter);
    this._chartProductSalesService.getSales(filter).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.active = true;
        this.data = this._chartProductSalesService.setData(this.dbdata);
        //const id =
        //const data_aux = this._chartProductSalesService.setData(this.dbdata);
        //console.log(data_aux);


      },
      err => {
        console.log(err)
      });
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartProductSalesService.getResponsive(padding, offset);
  }
}
