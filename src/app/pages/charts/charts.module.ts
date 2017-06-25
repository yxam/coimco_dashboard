import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MaterialModule } from '@angular/material';
import { routing } from './charts.routing';
import { Charts } from './charts.component';
import { chartistJsProduct } from './components/chartistJsProduct/chartistJsProduct.component';
import { chartistJsProductService } from './components/chartistJsProduct/chartistJsProduct.service';
import { AppTranslationModule } from '../../app.translation.module';
import { ChartDashboardProduct } from './components/chartistJsProduct/chartDashboard.component';
import { ChartDashboardProvider } from './components/chartistJsProvider/chartDashboard.component';  // include purchases urls
import { ChartDashboardCustomer } from './components/chartistJsCustomer/chartDashboard.component';
import { ChartDashboardSale } from './components/chartistJsSale/chartDashboard.component';
import { ChartBestSellerService } from './components/chartistJsProduct/product/bestseller/chartBestSeller.services';
import { ChartBestSeller } from './components/chartistJsProduct/product/bestseller/chartBestSeller.component';

import { ChartProductSalesService } from './components/chartistJsProduct/product/productsales/chartProductSales.services';
import { ChartProductSales } from './components/chartistJsProduct/product/productsales/chartProductSales.component';
import { ChartRankCategoryService } from './components/chartistJsProduct/product/rankcategory/chartRankCategory.services';
import { ChartRankCategory } from './components/chartistJsProduct/product/rankcategory/chartRankCategory.component';
import { ChartRankBrandService } from './components/chartistJsProduct/product/rankbrand/chartRankBrand.services';
import { ChartRankBrand } from './components/chartistJsProduct/product/rankbrand/chartRankBrand.component';
import { ChartProductPriceService } from './components/chartistJsProduct/product/productprice/chartProductPrice.services';
import { ChartProductPrice } from './components/chartistJsProduct/product/productprice/chartProductPrice.component';
import { ChartsAPI } from './chartsAPI.services';

import { chartistJsCustomerService } from './components/chartistJsCustomer/chartistJsCustomer.service';
import { chartistJsSaleService } from './components/chartistJsSale/chartistJsSale.service';

import { MdButtonModule } from '@angular/material';
import { AutocompleteOverview } from './components/searcher/searcher.component';
import { MdAutocompleteModule } from '@angular/material';

//customers urls
import { ChartProductBuy } from './components/chartistJsCustomer/Customer/ProductBuy/chartProductBuy.component';
import { ChartProductBuyService } from './components/chartistJsCustomer/Customer/ProductBuy/chartProductBuy.services';
import { ChartFrequency } from './components/chartistJsCustomer/Customer/Frequency/chartFrequency.component';
import { ChartFrequencyService } from './components/chartistJsCustomer/Customer/Frequency/chartFrequency.services';
import { ChartCollected } from './components/chartistJsCustomer/Customer/Collected/chartCollected.component';
import { ChartCollectedService } from './components/chartistJsCustomer/Customer/Collected/chartCollected.services';
import { ChartBestProduct } from './components/chartistJsCustomer/Customer/BestProduct/chartBestProduct.component';
import { ChartBestProductService } from './components/chartistJsCustomer/Customer/BestProduct/chartBestProduct.services';
import { ChartRankingCustomer } from './components/chartistJsCustomer/Customer/RankingCustomer/chartRankingCustomer.component';
import { ChartRankingCustomerService } from './components/chartistJsCustomer/Customer/RankingCustomer/chartRankingCustomer.services'

//providers - purchase
import { ChartRankingPurchase } from './components/chartistJsProvider/Provider/RankingPurchase/chartRankingPurchase.component';
import { ChartRankingPurchaseService } from './components/chartistJsProvider/Provider/RankingPurchase/chartRankingPurchase.services';
import { ChartRankingProvider } from './components/chartistJsProvider/Provider/RankingProvider/chartRankingProvider.component';
import { ChartRankingProviderService } from './components/chartistJsProvider/Provider/RankingProvider/chartRankingProvider.services';
import { ChartRankingProviderInTime } from './components/chartistJsProvider/Provider/RankingProviderInTime/chartRankingProviderInTime.component';
import { ChartRankingProviderInTimeService } from './components/chartistJsProvider/Provider/RankingProviderInTime/chartRankingProviderInTime.services';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
    MdButtonModule,
    ReactiveFormsModule,
    MaterialModule,
    MdAutocompleteModule,
    //  BrowserAnimationsModule,
  ],
  declarations: [
    Charts,
    chartistJsProduct,
    ChartDashboardProduct,
    ChartDashboardProvider,
    ChartDashboardCustomer,
    ChartDashboardSale,
    ChartBestSeller,
    ChartProductSales,
    ChartRankCategory,
    ChartRankBrand,
    ChartProductPrice,
    AutocompleteOverview,

    //customer
    ChartProductBuy,
    ChartFrequency,
    ChartCollected,
    ChartBestProduct,
    ChartRankingCustomer,

    //provider-purchase
    ChartRankingPurchase,
    ChartRankingProvider,
    ChartRankingProviderInTime,
  ],
  providers: [
    chartistJsProductService,
    chartistJsCustomerService,
    ChartsAPI,
    chartistJsSaleService,

    //product
    ChartBestSellerService,
    ChartProductSalesService,
    ChartRankCategoryService,
    ChartRankBrandService,
    ChartProductPriceService,

    //customer
    ChartProductBuyService,
    ChartFrequencyService,
    ChartCollectedService,
    ChartBestProductService,
    ChartRankingCustomerService,
    

    //provider-purchase
    ChartRankingPurchaseService,
    ChartRankingProviderService,
    ChartRankingProviderInTimeService,
  ],
  bootstrap: [AutocompleteOverview],
})
export class ChartsModule { }
