import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../../../theme';
import { ChartsAPI } from './../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class trafficChartProductService {
  dbdata: JSON[] = [];
  products: JSON[] = [];
  //dbdata: any;
  aux: Object;
  data_traffic: Array<Object>;
  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _ChartsAPI: ChartsAPI) {


  }
  /*  initData() {
      const dashboardColors = this._baConfig.get().colors.dashboard;
      this._ChartsAPI.getStatstrafficChart()
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
            value: data_chart[0]['Rent'],
            color: dashboardColors.white,
            highlight: colorHelper.shade(dashboardColors.white, 15),
            label: data_chart[0]['Name'],
            percentage: 87,
            order: 1,
          };
          console.log(object1);
          //this.data_traffic.push(object1);

          const object2 = {
            value: data_chart[1]['Rent'],
            color: dashboardColors.gossip,
            highlight: colorHelper.shade(dashboardColors.gossip, 15),
            label: data_chart[1]['Name'],
            percentage: 22,
            order: 4,
          };
          //this.data_traffic.push(object2);

          const object3 = {
            value: data_chart[2]['Rent'],
            color: dashboardColors.silverTree,
            highlight: colorHelper.shade(dashboardColors.silverTree, 15),
            label: data_chart[2]['Name'],
            percentage: 70,
            order: 3,
          };
          //this.data_traffic.push(object3);

          const object4 = {
            value: data_chart[3]['Rent'],
            color: dashboardColors.surfieGreen,
            highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
            label: data_chart[3]['Name'],
            percentage: 38,
            order: 2,
          };
          //this.data_traffic.push(object4);

          const object5 = {
            value: data_chart[4]['Rent'],
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
  */
  /*getData() {
    this.initData();
    console.log(this.data_traffic);
    return this.data_traffic;
  }*/
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


  /*  setData(dbdata: Array<JSON>) {
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
        value: data_chart[0]['Rent'],
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: data_chart[0]['Name'],
        percentage: 87,
        order: 1,
      }, {
          value: data_chart[1]['Rent'],
          color: dashboardColors.gossip,
          highlight: colorHelper.shade(dashboardColors.gossip, 15),
          label: data_chart[1]['Name'],
          percentage: 22,
          order: 4,
        }, {
          value: data_chart[2]['Rent'],
          color: dashboardColors.silverTree,
          highlight: colorHelper.shade(dashboardColors.silverTree, 15),
          label: data_chart[2]['Name'],
          percentage: 70,
          order: 3,
        }, {
          value: data_chart[3]['Rent'],
          color: dashboardColors.surfieGreen,
          highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
          label: data_chart[3]['Name'],
          percentage: 38,
          order: 2,
        }, {
          value: data_chart[4]['Rent'],
          color: dashboardColors.blueStone,
          highlight: colorHelper.shade(dashboardColors.blueStone, 15),
          label: data_chart[4]['Name'],
          percentage: 17,
          order: 0,
        },
      ];

    }*/
  getSeller(filter: JSON): any {
    return this._ChartsAPI.getBestSeller(filter);
  }
  setData(data: Array<JSON>) {
    const dashboardColors = this._baConfig.get().colors.dashboard;

    this.dbdata = data;
    const list: string[] = [];
    this.dbdata.forEach(variable =>
      list.push(JSON.stringify(variable))
    );
    let data_chart: JSON[] = [];
    let data_aux: any[] = [];
    let key: any[] = [];
    for (let p in dashboardColors) {
      key.push(p);
    }
    for (let i = 0; i < list.length; i++) {
      data_chart.push(JSON.parse(list[i]));
      const object1 = {
        value: data_chart[i]['category'],
        color: dashboardColors[key[i]],
        highlight: colorHelper.shade(dashboardColors[key[i]], 15),
        label: data_chart[i]['name'],
        percentage: 87,
        order: i,
      };
      //const aux = JSON.parse(object1);
      data_aux.push(object1);
    }
    this.data_traffic = data_aux;
    return this.data_traffic;

  }

}
