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
  value: number;
  category_default: string;
  startDate = new Date('2011/01/01');
  endDate = Date.now();
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
  ngOnInit() {
    this.value = 5;
    this.category_default = 'Accesorios';
    //this.data = this._chartBestSellerService.getAll();
    this.active = false;
  }
  getResponsive(padding, offset) {
    return this._chartBestSellerService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log("1 - ", f.value);

    console.log("2 - ", f.valid);
    this._chartBestSellerService.getSeller(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        //this.dbdata = data['data'][0];
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.active = true;
        this.data = this._chartBestSellerService.setData(this.dbdata);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }
}
