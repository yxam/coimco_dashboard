import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartFrequencyService } from './chartFrequency.services';
import { ChartsAPI } from './../../../../chartsAPI.services';
@Component({
  selector: 'chartproduct-buy',
  templateUrl: './chartFrequency.html',
  styleUrls: ['./../../chartistJsCustomer.scss'],
})

export class ChartFrequency {
  data: any;
  dbdata: any;
  active: boolean;
  category_default: string;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  dataCustomer: any;
  constructor(
    private _chartFrequencyService: ChartFrequencyService,
    private _chartAPI: ChartsAPI) {

  }
  ngOnInit() {
    this.value = 5;
    this.category_default = 'Accesorios';
    this.active = false;
    //this.data = this._chartFrequencyService.getAll();
  }
  getResponsive(padding, offset) {
    return this._chartFrequencyService.getResponsive(padding, offset);
  }
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartFrequencyService.getCustomers(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        this.dataCustomer = this._chartFrequencyService.setData(this.dbdata);
        this.active = true;

      },
      err => {
        console.log(err)
      });
  }
}
