import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { AutocompleteOverviewProvider } from './../../../searcher/provider/searcherProvider.component';
import { ChartRankingProviderCategoryService } from './chartRankingProviderCategory.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProviderCategory.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProviderCategory {
  data: any;
  dbdata: any;
  provider_id: any;
  category_default: string;
  active: boolean;
  value: any;
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
    private _chartRankingProviderCategoryService: ChartRankingProviderCategoryService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.value = 5;
    this.category_default = 'Accesorios';
    this.active = false;
    //this.data = this._chartRankingProviderCategoryService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProviderCategoryService.getResponsive(padding, offset);
  }
  showId(event): void {
    if (event.id !== null) {
      this.provider_id = event.id;
    }
  }

  onSubmit(f: NgForm) {
    this.active = false;
    if (this.provider_id == null) {
      alert("Debe elegir un proveedor");
      return;
    }
    let ke;
    for (var prop in f.value) {
      if (prop === '[object Object]' && f.value[prop]) {
        ke = f.value[prop];
      }
    }
    let form = JSON.stringify({
      start: f.value.start,
      end: f.value.end,
      k: ke,
      id: this.provider_id
    });
    const filter = JSON.parse(form);
    this._chartRankingProviderCategoryService.getProviders(filter).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingProviderCategoryService.setData(this.dbdata);
        this.active = true;
        console.log(this.data);

      },
      err => {
        console.log(err)
      });
  }
}
