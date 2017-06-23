import { Routes, RouterModule } from '@angular/router';

import { Charts } from './charts.component';
import { chartistJsProduct } from './components/chartistJsProduct/chartistJsProduct.component';
import { ChartDashboardProduct } from './components/chartistJsProduct/chartDashboard.component';
import { ChartDashboardProvider } from './components/chartistJsProvider/chartDashboard.component';
import { ChartDashboardCustomer } from './components/chartistJsCustomer/chartDashboard.component';
import { ChartDashboardPurchase } from './components/chartistJsPurchase/chartDashboard.component';
import { ChartDashboardSale } from './components/chartistJsSale/chartDashboard.component';
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
      
      { path: 'product', component: ChartDashboardProduct },      //Products
      { path: 'provider', component: ChartDashboardProvider },    //Providers
      { path: 'customer', component: ChartDashboardCustomer },    //Customers
      { path: 'purchase', component: ChartDashboardPurchase },    //Purchases
      { path: 'sale', component: ChartDashboardSale },            //Sale
      { path: 'bestseller', component: ChartBestSeller },
      { path: 'productsales', component: ChartProductSales },
      { path: 'rankcategory', component: ChartRankCategory },
      { path: 'rankbrand', component: ChartRankBrand },
      { path: 'productprice', component: ChartProductPrice },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
