import {Component, Input } from '@angular/core';

import {trafficChartProductService} from './trafficChartProduct.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['./trafficChart.scss']
})

// TODO: move chart.js to it's own component
export class TrafficChartProduct {
  @Input() filter: any;
  //private dbdata: any;
  public doughnutData: Array<Object>
  active: boolean;
  aux: Array<Object>
  dbdata: any;
  constructor(private trafficChartProductService: trafficChartProductService) {
    //this.doughnutData = trafficChartService.getData2();
    //console.log(this.doughnutData);

  }
  ngOnInit() {
    console.log(this.filter);
    this.trafficChartProductService.getSeller(this.filter).subscribe(
      data => {
        this.dbdata = data['data'];
        this.doughnutData = this.trafficChartProductService.setData(this.dbdata);
        this._loadDoughnutCharts();
      },
      err => {
        console.log(err)
      });


  }
  ngAfterViewInit() {
    //  this._loadDoughnutCharts();
  }

  private _loadDoughnutCharts() {
    console.log("HOLA");
    let el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout: 64,
      responsive: true
    });
  }
}
