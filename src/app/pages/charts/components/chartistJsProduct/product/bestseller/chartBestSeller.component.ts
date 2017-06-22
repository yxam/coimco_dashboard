import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartBestSellerService } from './chartBestSeller.services';

@Component({
  selector: 'chartbest-seller',
  templateUrl: './chartBestSeller.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartBestSeller {
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  constructor(
    private _chartBestSellerService: ChartBestSellerService) {

  }
  ngOnInit() {
    this.data = this._chartBestSellerService.getAll();
    this.active = false;
  }
  getResponsive(padding, offset) {
    return this._chartBestSellerService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartBestSellerService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        //this.dbdata = data['data'][0];

        this.active = true;



      },
      err => {
        console.log(err)
      });
  }
}
