import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdButtonModule } from '@angular/material'
import { ChartRankingProviderInTimeService } from './chartRankingProviderInTime.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { AutocompleteOverviewProvider } from './../../../searcher/provider/searcherProvider.component';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProviderInTime.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProviderInTime {
  data: any;
  dbdata: any;
  datos_aux: any;
  provider_id: any;
  active: boolean;

  constructor(
    private _chartRankingProviderInTimeService: ChartRankingProviderInTimeService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    //this.data = this._chartRankingProviderInTimeService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProviderInTimeService.getResponsive(padding, offset);
  }
  showId(event): void {
    if (event.id !== null) {
      this.provider_id = event.id;
    }
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this.active = false;
    if (this.provider_id === null) {
      alert('Debe ingresar un producto');
    }
    let form = JSON.stringify({
      start: f.value.start,
      end: f.value.end,
      k: f.value.k,
      id: this.provider_id
    });
    const filter = JSON.parse(form);
    this._chartRankingProviderInTimeService.getProvider(filter)
      .subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.data = this._chartRankingProviderInTimeService.setData(this.dbdata);
        this.active = true;

        //this.datos_aux = this._chartRankingProviderInTimeService.getAll();
      },
      err => {
        console.log(err)
      });
  }
}
