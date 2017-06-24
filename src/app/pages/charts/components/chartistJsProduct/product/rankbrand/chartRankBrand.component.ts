import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { ChartRankBrandService } from './chartRankBrand.services';

@Component({
  selector: 'chartrank-category',
  templateUrl: './chartRankBrand.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartRankBrand implements OnInit {
  data: any;
  active: boolean;
  dbdata: any;
  constructor(private _chartRankBrandService: ChartRankBrandService) { }
  ngOnInit() {
    //this.data = this._chartRankBrandService.getAll();
    this.active = false;
    console.log(localStorage.getItem('currentUser'));
  }

  getResponsive(padding, offset) {
    return this._chartRankBrandService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this.active = false;
    this._chartRankBrandService.getBran(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.active = true;
        this.data = this._chartRankBrandService.setData(this.dbdata);


      },
      err => {
        console.log(err)
      });
  }
}
