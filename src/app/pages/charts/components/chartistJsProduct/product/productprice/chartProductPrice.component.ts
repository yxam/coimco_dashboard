import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { ChartProductPriceService } from './chartProductPrice.services';
import { AutocompleteOverviewProduct } from './../../../searcher/product/searcherProduct.component';
import 'hammerjs';

@Component({
  selector: 'chartProduct-price',
  templateUrl: './chartProductPrice.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartProductPrice implements OnInit {
  data: any;
  products: any;
  active: boolean;
  dbdata: any;
  product_id: any;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();


  constructor(private _chartProductPriceService: ChartProductPriceService) {

  }
  ngOnInit() {
    //this.data = this._chartProductPriceService.getAll();
    this.active = false;
    this.value = 5;
    this._chartProductPriceService.getProductsDb()
      .subscribe(
      data => {
        this.products = data;
      }
      )
  }
  showId(event): void {
    if (event.id !== null) {
      this.product_id = event.id;
    }
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this.active = false;
    console.log(this.product_id);
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
    console.log("AQUI ---> ", form);
    const filter = JSON.parse(form);
    this._chartProductPriceService.getPrices(filter)
      .subscribe(
      data => {
        this.dbdata = data['data'];
        this.active = true;
        this.data = this._chartProductPriceService.setData(this.dbdata);
      },
      err => { console.log(err) }
      );
  }
  getResponsive(padding, offset) {
    return this._chartProductPriceService.getResponsive(padding, offset);

  }
}
