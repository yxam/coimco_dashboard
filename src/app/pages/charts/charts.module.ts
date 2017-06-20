import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './charts.routing';
import { Charts } from './charts.component';
import { ChartistJs } from './components/chartistJs/chartistJs.component';
import { ChartistJsService } from './components/chartistJs/chartistJs.service';
import { AppTranslationModule } from '../../app.translation.module';
import { ChartDashboard } from './components/chartistJs/chartDashboard.component';
import { ChartBestSellerService } from './components/chartistJs/product/bestseller/chartBestSeller.services';
import { ChartBestSeller } from './components/chartistJs/product/bestseller/chartBestSeller.component';
import { ChartProductSalesService } from './components/chartistJs/product/productsales/chartProductSales.services';
import { ChartProductSales } from './components/chartistJs/product/productsales/chartProductSales.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [
    Charts,
    ChartistJs,
    ChartDashboard,
    ChartBestSeller,
    ChartProductSales,
  ],
  providers: [
    ChartistJsService,
    ChartBestSellerService,
    ChartProductSalesService,
  ],
})
export class ChartsModule {}
