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
  constructor(
    private _chartRankingProviderInTimeService: ChartRankingProviderInTimeService,
    private _chartAPI: ChartsAPI) {

  }

  ngOnInit() {
    this.active = false;
    this.value = 5;
    this.category_default = 'Accesorios';
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
    this.active = false;
    this._chartRankingProviderInTimeService.getProvider(f.value)
      .subscribe(data => {
        this.dbdata = data['data'];
        this.data = this._chartRankingProviderInTimeService.setData(this.dbdata);
        this.active = true;
        console.log(this.data);

        //this.datos_aux = this._chartRankingProviderInTimeService.getAll();
      },
      err => {
        console.log(err);
      });
  }
}
