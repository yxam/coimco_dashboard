/**
* Component de RankingProvider
*/
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartRankingProviderService } from './chartRankingProvider.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartRanking-Purchase',
  templateUrl: './chartRankingProvider.html',
  styleUrls: ['./../../chartistJsProvider.scss'],
})

export class ChartRankingProvider {
  data: any;
  active: boolean;
  dbdata: any;
  category_default: string;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  constructor(
    private _chartRankingProviderService: ChartRankingProviderService,
    private _chartAPI: ChartsAPI) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    this.active = false;
    this.value = 5;
    this.category_default = 'Accesorios';
    //this.data = this._chartRankingProviderService.getAll();
  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartRankingProviderService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankingProviderService.getProvider(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        console.log(this.dbdata);
        this.data = this._chartRankingProviderService.setData(this.dbdata);
        this.active = true;

      },
      err => {
        console.log(err)
      });
  }
}
