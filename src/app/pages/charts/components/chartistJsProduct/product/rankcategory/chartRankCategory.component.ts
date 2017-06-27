import { Component, OnInit } from '@angular/core';
import { ChartRankCategoryService } from './chartRankCategory.services';
import { NgForm } from '@angular/forms';
import {MdButtonModule} from '@angular/material';
@Component({
  selector: 'chartrank-category',
  templateUrl: './chartRankCategory.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartRankCategory implements OnInit {
  data: any;
  active: boolean;
  dbdata: any;
  constructor(private _chartRankCategoryService: ChartRankCategoryService) {

  }
  ngOnInit() {
    //this.data = this._chartRankCategoryService.getAll();
    this.active = false;
  }

  getResponsive(padding, offset) {
    return this._chartRankCategoryService.getResponsive(padding, offset);
  }

  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankCategoryService.getCategory(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        console.log(this.dbdata);
        //this.data=this._chartRankCategory.setData(this.dbdata);
        this.active = true;
        this.data = this._chartRankCategoryService.setData(this.dbdata);



      },
      err => {
        console.log(err)
      });
  }
}
