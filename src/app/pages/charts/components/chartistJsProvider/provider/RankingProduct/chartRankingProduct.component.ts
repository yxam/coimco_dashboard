import { Component, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingProductService } from './chartRankingProduct.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { DataTablesProvider } from './../dataTables/dataTablesProvider.component';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProduct.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProduct {

  //Info de provider, para enviarla al component de la tabla
  dataProviders: Object = null;
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  constructor(
    private _chartRankingProductService: ChartRankingProductService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;

    //this.data = this._chartRankingProductService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingProductService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this.active = false;
    this._chartRankingProductService.getInfoProvider(f.value).subscribe(
      data => {
        console.log("Aqui -> ", data);
        this.dbdata = data['data'];
        //console.log(this.dbdata);
        this.dataProviders = this.dbdata;
        this.data = this._chartRankingProductService.setData(this.dbdata);
        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
