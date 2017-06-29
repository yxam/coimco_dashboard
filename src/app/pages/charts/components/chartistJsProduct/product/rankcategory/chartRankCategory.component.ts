import { Component, OnInit } from '@angular/core';
import { ChartRankCategoryService } from './chartRankCategory.services';
import { NgForm } from '@angular/forms';
import {MdButtonModule} from '@angular/material';
@Component({
  selector: 'chartrank-category',
  templateUrl: './chartRankCategory.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})
/*
luctus
justo
Pellentesque
eul
elit
tempus
turpis
gravida
etk
nequ
eni
iaculis
mip
ipsum
leo
felis
quis
atd
*/
export class ChartRankCategory implements OnInit {
  data: any;
  active: boolean;
  dbdata: any;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  category_default: string;
  categories = [
    { value: 'Accesorios', viewValue: 'Accesorios' },
    { value: 'Conectividad', viewValue: 'Conectividad' },
    { value: 'Servidores', viewValue: 'Servidores' },
    { value: 'Computadores', viewValue: 'Computadores' },
    { value: 'Almacenamiento', viewValue: 'Almacenamiento' },
    { value: 'Gabinetes', viewValue: 'Gabinetes' },
    { value: 'Racks', viewValue: 'Racks' },
  ];
  constructor(private _chartRankCategoryService: ChartRankCategoryService) {

  }
  ngOnInit() {
    //this.data = this._chartRankCategoryService.getAll();
    this.category_default = 'Accesorios';
    this.active = false;
    this.value = 5;

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
