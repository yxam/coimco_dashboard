import { Component, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingProductPurchaseService } from './chartRankingProductPurchase.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { DataTablesProvider } from './../dataTables/dataTablesProvider.component';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProductPurchase.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProductPurchase {

  //Info de provider, para enviarla al component de la tabla
  dataProviders: Object = null;
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  constructor(
    private _chartRankingProductPurchaseService: ChartRankingProductPurchaseService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    this.value = 5;
    //this.data = this._chartRankingProductPurchaseService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProductPurchaseService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingProductPurchaseService.getInfoProvider(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        //console.log(this.dbdata);
        this.dataProviders = this.dbdata;
        this.data = this._chartRankingProductPurchaseService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
