import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DataTablesProviderService } from './dataTablesProvider.service';

@Component({
  selector: 'data-tablesProvider',
  templateUrl: './dataTablesProvider.html',
  styleUrls: ['./dataTables.scss']
})
export class DataTablesProvider {

  @Input() dataProvider: Object;
  data;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";

  constructor(private service: DataTablesProviderService) {

  }
  ngOnInit() {

    this.data = this.service.setData(this.dataProvider);
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
