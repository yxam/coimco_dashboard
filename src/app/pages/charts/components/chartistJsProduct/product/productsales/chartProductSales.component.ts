import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { ChartProductSalesService } from './chartProductSales.services';
import { AutocompleteOverview } from './../../../searcher/searcher.component';

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
  constructor(private _chartProductSalesService: ChartProductSalesService) {

  }
  ngOnInit() {
    this.data = this._chartProductSalesService.getAll();
    this.active = false;
    this._chartProductSalesService.getProductsDb()
      .subscribe(
      data => {
        this.products = data;
        console.log(this.products);
      }

      );

  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this.active = false;
    this._chartProductSalesService.getSales(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.active = true;
        const data_aux = this._chartProductSalesService.setData(this.dbdata);
        console.log(data_aux);

      },
      err => {
        console.log(err)
      });
  }
  getResponsive(padding, offset) {
    return this._chartProductSalesService.getResponsive(padding, offset);
  }
}
