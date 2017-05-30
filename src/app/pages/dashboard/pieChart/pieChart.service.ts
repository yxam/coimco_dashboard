import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'dashboard.new_visits',
        stats: '1.120',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'dashboard.purchases',
        stats: '$ 901',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'dashboard.active_users',
        stats: '91',
        icon: 'refresh',
      }, {
        color: pieColor,
        description: 'dashboard.returned',
        stats: '12.232.592',
        icon: 'money',
      }
    ];
  }
}
