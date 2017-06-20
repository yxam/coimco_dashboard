import { Routes, RouterModule } from '@angular/router';

import { Charts } from './charts.component';
import { ChartistJs } from './components/chartistJs/chartistJs.component';
import { ChartDashboard } from './components/chartistJs/chartDashboard.component';
import { ChartBestSeller } from './components/chartistJs/product/bestseller/chartBestSeller.component';
import { ChartProductSales } from './components/chartistJs/product/productsales/chartProductSales.component';
import { ChartRankCategory } from './components/chartistJs/product/rankcategory/chartRankCategory.component';
import { ChartRankBrand } from './components/chartistJs/product/rankbrand/chartRankBrand.component';
import { ChartProductPrice } from './components/chartistJs/product/productprice/chartProductPrice.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Charts,
    children: [
      { path: 'chartist-js', component: ChartDashboard },
      { path: 'chartist-js2', component: ChartistJs },
      { path: 'chartist-js3', component: ChartistJs },
      { path: 'bestseller', component: ChartBestSeller },
      { path: 'productsales', component: ChartProductSales },
      { path: 'rankcategory', component: ChartRankCategory },
      { path: 'rankbrand', component: ChartRankBrand },
      { path: 'productprice', component: ChartProductPrice },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
