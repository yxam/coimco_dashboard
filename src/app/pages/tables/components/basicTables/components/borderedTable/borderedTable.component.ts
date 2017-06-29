import {Component, Input} from '@angular/core';



@Component({
  selector: 'bordered-table',
  templateUrl: './borderedTable.html',
})
export class BorderedTable {
  @Input() customer: Array<any>;
  metricsTableData: Array<any>;

  constructor() {
  }
  ngOnInit() {
    let arr: any[] = [];
    for (let ix in this.customer) {
      arr.push(JSON.parse(this.customer[ix]));
    }
    this.metricsTableData = arr;
  }
}
