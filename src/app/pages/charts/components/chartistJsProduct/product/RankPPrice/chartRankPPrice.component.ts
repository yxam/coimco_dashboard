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
  startDate = new Date('2011/01/01');
  endDate = Date.now();
  constructor(private _ChartRankPPriceService: ChartRankPPriceService) {

  }
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
  showId(event): void {
    if (event.id !== null) {
      this.product_id = event.id;
    }
  }
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
    this._ChartRankPPriceService.getPrices(filter)
      .subscribe(
      data => {
        this.dbdata = data['data'];
        this.active = true;
        console.log("AQUIIIII -> ", this.dbdata);
        this.data = this._ChartRankPPriceService.setData(this.dbdata);
        console.log("ACAAAAA -> ", this.data);
      },
      err => { console.log(err) }
      );
  }
  getResponsive(padding, offset) {
    return this._ChartRankPPriceService.getResponsive(padding, offset);

  }
}
