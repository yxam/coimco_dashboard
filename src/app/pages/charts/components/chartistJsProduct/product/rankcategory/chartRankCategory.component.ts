import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankCategoryService } from './chartRankCategory.services';

@Component({
  selector: 'chartrank-category',
  templateUrl: './chartRankCategory.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartRankCategory implements OnInit {
  data: any;
  active: boolean;
  dbdata: any;
  constructor(private _chartRankCategory: ChartRankCategoryService) {

  }
  ngOnInit() {
    this.data = this._chartRankCategory.getAll();
    this.active = false;
  }

  getResponsive(padding, offset) {
    return this._chartRankCategory.getResponsive(padding, offset);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this._chartRankCategory.getCategory(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        //this.dbdata = data['data'][0];
        this.dbdata = data['data'];
        console.log(this.dbdata);
        //this.data=this._chartRankCategory.setData(this.dbdata);
        this.active = true;



      },
      err => {
        console.log(err)
      });
  }
}
