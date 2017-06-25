import {Component} from '@angular/core';

import {TrafficChartService} from './trafficChart.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['./trafficChart.scss']
})

// TODO: move chart.js to it's own component
export class TrafficChart {
  private dbdata: any;
  public doughnutData: Array<Object>
  active: boolean;
  aux: Array<Object>
  constructor(private trafficChartService: TrafficChartService) {
    console.log("HOLA")
    this.doughnutData = trafficChartService.getData2();
    console.log(this.doughnutData);
    /*trafficChartService.getDataStats()
      .subscribe(
      data => {
        this.dbdata = data['data'];
        console.log(this.doughnutData);
        this.doughnutData = trafficChartService.setData(this.dbdata);

      });*/

  }

  ngAfterViewInit() {
    this._loadDoughnutCharts();
  }

  private _loadDoughnutCharts() {
    let el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout: 64,
      responsive: true
    });
  }
}
