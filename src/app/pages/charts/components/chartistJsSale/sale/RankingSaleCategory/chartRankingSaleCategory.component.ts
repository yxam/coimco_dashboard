import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingSaleCategoryService } from './chartRankingSaleCategory.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRankingSaleCategory',
  templateUrl: './chartRankingSaleCategory.html',
  styleUrls: ['./../../chartistJsSale.scss'],
})

export class ChartRankingSaleCategory {
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  value: number;
  category_default: string;
  startDate = new Date('2015/01/01');
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
    private _chartRankingSaleCategoryService: ChartRankingSaleCategoryService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    this.value = 5;
    this.category_default = 'Accesorios';
    //this.data = this._chartRankingSaleCategoryService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingSaleCategoryService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingSaleCategoryService.getCustomers(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingSaleCategoryService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
