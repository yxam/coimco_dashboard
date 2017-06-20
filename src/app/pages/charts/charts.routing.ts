import { Routes, RouterModule } from '@angular/router';

import { Charts } from './charts.component';
import { chartistJsProduct } from './components/chartistJsProduct/chartistJsProduct.component';
import { ChartDashboardProduct } from './components/chartistJsProduct/chartDashboard.component';
import { ChartDashboardProvider } from './components/chartistJsProvider/chartDashboard.component';
import { ChartBestSeller } from './components/chartistJsProduct/product/bestseller/chartBestSeller.component';
import { ChartProductSales } from './components/chartistJsProduct/product/productsales/chartProductSales.component';
import { ChartRankCategory } from './components/chartistJsProduct/product/rankcategory/chartRankCategory.component';
import { ChartRankBrand } from './components/chartistJsProduct/product/rankbrand/chartRankBrand.component';
import { ChartProductPrice } from './components/chartistJsProduct/product/productprice/chartProductPrice.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Charts,
    children: [
      { path: 'chartist-js', component: ChartDashboardProduct },
      { path: 'chartist-js2', component: ChartDashboardProvider },
      { path: 'chartist-js3', component: chartistJsProduct },
      //Products
      { path: 'bestseller', component: ChartBestSeller },
      { path: 'productsales', component: ChartProductSales },
      { path: 'rankcategory', component: ChartRankCategory },
      { path: 'rankbrand', component: ChartRankBrand },
      { path: 'productprice', component: ChartProductPrice },
      //Providers

      //Customers
    ],
  },
];

export const routing = RouterModule.forChild(routes);
