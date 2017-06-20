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
import { ChartRankCategoryService } from './components/chartistJs/product/rankcategory/chartRankCategory.services';
import { ChartRankCategory } from './components/chartistJs/product/rankcategory/chartRankCategory.component';
import { ChartRankBrandService } from './components/chartistJs/product/rankbrand/chartRankBrand.services';
import { ChartRankBrand } from './components/chartistJs/product/rankbrand/chartRankBrand.component';
import { ChartProductPriceService } from './components/chartistJs/product/productprice/chartProductPrice.services';
import { ChartProductPrice } from './components/chartistJs/product/productprice/chartProductPrice.component';

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
    ChartRankCategory,
    ChartRankBrand,
    ChartProductPrice,
  ],
  providers: [
    ChartistJsService,
    ChartBestSellerService,
    ChartProductSalesService,
    ChartRankCategoryService,
    ChartRankBrandService,
    ChartProductPriceService,
  ],
})
export class ChartsModule {}
