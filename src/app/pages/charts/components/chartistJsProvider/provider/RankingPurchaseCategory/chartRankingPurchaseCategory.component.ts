import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingPurchaseCategoryService } from './chartRankingPurchaseCategory.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingPurchaseCategory.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingPurchaseCategory {
  data: any;
  active: boolean;
  dbdata: any;
  category_default: string;
  value: number;
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
    private _chartRankingPurchaseCategoryService: ChartRankingPurchaseCategoryService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    //this.data = this._chartRankingPurchaseCategoryService.getAll();
    this.active = false;
    this.value = 5;
    this.category_default = 'Accesorios';
  }
  getResponsive(padding, offset) {
    return this._chartRankingPurchaseCategoryService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingPurchaseCategoryService.getPurchaseCategory(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingPurchaseCategoryService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
