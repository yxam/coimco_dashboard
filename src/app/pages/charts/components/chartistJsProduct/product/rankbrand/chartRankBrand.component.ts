import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    this.data = this._chartRankBrandService.getAll();
    this.active = false;
  }

  getResponsive(padding, offset) {
    return this._chartRankBrandService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankBrandService.getBran(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'];
        this.active = true;
        this._chartRankBrandService.setData(this.dbdata);


      },
      err => {
        console.log(err)
      });
  }
}
