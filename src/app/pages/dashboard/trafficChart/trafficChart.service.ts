import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';
import { Data_API } from './../data_API.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TrafficChartService {
  dbdata: JSON[] = [];
  products: JSON[] = [];
  //dbdata: any;
  aux: Object;
  data_traffic: Array<Object>;
  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _data_API: Data_API) {


  }
  initData() {
    const dashboardColors = this._baConfig.get().colors.dashboard;
    this._data_API.getStatstrafficChart()
      .subscribe(
      data => {
        this.dbdata = data['data'];
        const list: string[] = [];
        this.dbdata.forEach(variable =>
          list.push(JSON.stringify(variable))
        );
        let data_chart: JSON[] = [];

        for (let i = 0; i < list.length; i++) {
          data_chart.push(JSON.parse(list[i]));
        }

        const object1 = {
          value: parseFloat(data_chart[0]['Rent']).toFixed(2),
          color: dashboardColors.white,
          highlight: colorHelper.shade(dashboardColors.white, 15),
          label: data_chart[0]['Name'],
          percentage: 87,
          order: 1,
        };
        console.log("OBJECT -> ", object1);
        //this.data_traffic.push(object1);

        const object2 = {
          value: parseFloat(data_chart[1]['Rent']).toFixed(2),
          color: dashboardColors.gossip,
          highlight: colorHelper.shade(dashboardColors.gossip, 15),
          label: data_chart[1]['Name'],
          percentage: 22,
          order: 4,
        };
        //this.data_traffic.push(object2);

        const object3 = {
          value: parseFloat(data_chart[2]['Rent']).toFixed(2),
          color: dashboardColors.silverTree,
          highlight: colorHelper.shade(dashboardColors.silverTree, 15),
          label: data_chart[2]['Name'],
          percentage: 70,
          order: 3,
        };
        //this.data_traffic.push(object3);

        const object4 = {
          value: parseFloat(data_chart[3]['Rent']).toFixed(2),
          color: dashboardColors.surfieGreen,
          highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
          label: data_chart[3]['Name'],
          percentage: 38,
          order: 2,
        };
        //this.data_traffic.push(object4);

        const object5 = {
          value: parseFloat(data_chart[4]['Rent']).toFixed(2),
          color: dashboardColors.blueStone,
          highlight: colorHelper.shade(dashboardColors.blueStone, 15),
          label: data_chart[4]['Name'],
          percentage: 17,
          order: 0,
        };
        //this.data_traffic.push(object5);
        this.data_traffic = [object1, object2, object3, object4, object5];
        console.log(this.data_traffic);
      }
      )
  }

  getData() {
    this.initData();
    console.log(this.data_traffic);
    return this.data_traffic;
  }
  getData2() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 2000,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: 'Servidores',
        percentage: 87,
        order: 1,
      }, {
        value: 1500,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: 'Impresoras',
        percentage: 22,
        order: 4,
      }, {
        value: 1000,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: 'Perifericos',
        percentage: 70,
        order: 3,
      }, {
        value: 1200,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'MotherBoards',
        percentage: 38,
        order: 2,
      }, {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Notebooks',
        percentage: 17,
        order: 0,
      },
    ];
  }

  getDataStats(): Observable<JSON[]> {
    return this._data_API.getStatstrafficChart();
  }
  setData(dbdata: Array<JSON>) {
    const dashboardColors = this._baConfig.get().colors.dashboard;
    const list: string[] = [];
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    let data_chart: JSON[] = [];

    for (let i = 0; i < list.length; i++) {
      data_chart.push(JSON.parse(list[i]));
    }
    console.log(data_chart);
    return [{
      value: parseFloat(data_chart[0]['Rent']).toFixed(0),
      color: dashboardColors.white,
      highlight: colorHelper.shade(dashboardColors.white, 15),
      label: data_chart[0]['Name'],
      percentage: 87,
      order: 1,
    }, {
        value: parseFloat(data_chart[1]['Rent']).toFixed(0),
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: data_chart[1]['Name'],
        percentage: 22,
        order: 4,
      }, {
        value: parseFloat(data_chart[2]['Rent']).toFixed(0),
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: data_chart[2]['Name'],
        percentage: 70,
        order: 3,
      }, {
        value: parseFloat(data_chart[3]['Rent']).toFixed(0),
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: data_chart[3]['Name'],
        percentage: 38,
        order: 2,
      }, {
        value: parseFloat(data_chart[4]['Rent']).toFixed(0),
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: data_chart[4]['Name'],
        percentage: 17,
        order: 0,
      },
    ];

  }
}
