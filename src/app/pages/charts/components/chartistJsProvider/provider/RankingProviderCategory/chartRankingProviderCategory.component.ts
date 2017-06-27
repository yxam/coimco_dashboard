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
  active: boolean;
  constructor(
    private _chartRankingProviderCategoryService: ChartRankingProviderCategoryService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
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
    if (this.provider_id === null) {
      alert("Debe elegir un proveedor");
    }
    let form = JSON.stringify({
      start: f.value.start,
      end: f.value.end,
      k: f.value.k,
      id: this.provider_id
    });
    const filter = JSON.parse(form);
    this._chartRankingProviderCategoryService.getProviders(filter).subscribe(
      data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingProviderCategoryService.setData(this.dbdata);
        this.active = true;

      },
      err => {
        console.log(err)
      });
  }
}
