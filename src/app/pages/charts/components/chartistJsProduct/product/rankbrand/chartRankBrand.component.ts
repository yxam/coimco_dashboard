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
  value: number;
  category_default: string;
  startDate = new Date('2015/01/01');
  endDate = Date.now();

  categories = [
    { value: 'luctus', viewValue: 'luctus' },
    { value: 'justo', viewValue: 'justo' },
    { value: 'Pellentesque', viewValue: 'Pellentesque' },
    { value: 'eul', viewValue: 'eul' },
    { value: 'elit', viewValue: 'elit' },
    { value: 'tempus', viewValue: 'tempus' },
    { value: 'turpis', viewValue: 'turpis' },
    { value: 'gravida', viewValue: 'gravida' },
    { value: 'etk', viewValue: 'etk' },
    { value: 'nequ', viewValue: 'nequ' },
    { value: 'eni', viewValue: 'eni' },
    { value: 'iaculis', viewValue: 'iaculis' },
    { value: 'mip', viewValue: 'mip' },
    { value: 'ipsum', viewValue: 'ipsum' },
    { value: 'leo', viewValue: 'leo' },
    { value: 'felis', viewValue: 'felis' },
    { value: 'quis', viewValue: 'quis' },
    { value: 'atd', viewValue: 'atd' },
  ];
  constructor(private _chartRankBrandService: ChartRankBrandService) { }
  ngOnInit() {
    //this.data = this._chartRankBrandService.getAll();
    this.active = false;
    this.category_default = 'tempus';
    this.value = 5;

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
