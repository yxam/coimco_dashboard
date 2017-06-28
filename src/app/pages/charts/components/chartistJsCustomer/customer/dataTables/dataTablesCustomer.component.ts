import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DataTablesCustomerService } from './dataTablesCustomer.service';

@Component({
  selector: 'data-tablesCustomer',
  templateUrl: './dataTablesCustomer.html',
  styleUrls: ['./dataTables.scss']
})
export class DataTablesCustomer {

  @Input() dataProvider: Object;
  data;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";
  dbdata: Array<any>;
  constructor(private service: DataTablesCustomerService) {

  }
  ngOnInit() {
    this.service.getCustomers()
      .subscribe(data => {
        this.dbdata = data['data'];
        this.data = this.service.setData(this.dbdata);

      })

    /*this.service.getData().then((data) => {
      this.data = data;
    });*/
  }
  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

}
