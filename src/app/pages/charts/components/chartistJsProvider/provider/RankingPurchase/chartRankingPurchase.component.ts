import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingPurchaseService } from './chartRankingPurchase.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { MdButtonModule } from '@angular/material';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingPurchase.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingPurchase {
  data: any;
  dbdata: any;
  datos_aux: any;
  active: boolean;
  dataPurchase: any;
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
    private _chartRankingPurchaseService: ChartRankingPurchaseService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.active = false;
    this.value = 5;
    this.category_default = 'Accesorios';
    //this.data = this._chartRankingPurchaseService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartRankingPurchaseService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingPurchaseService.getPurchase(f.value).subscribe(
      data => {
        this.dbdata = data['data'];

        this.dataPurchase = this.dbdata;
        this.data = this._chartRankingPurchaseService.setData(this.dbdata);
        //this.datos_aux = this._chartRankingPurchaseService.getAll();

        this.active = true;
      },
      err => {
        console.log(err)
      });
  }
}
