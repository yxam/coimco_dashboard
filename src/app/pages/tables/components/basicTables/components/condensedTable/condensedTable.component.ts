import { Component, Input } from '@angular/core';

@Component({
  selector: 'condensed-table',
  templateUrl: './condensedTable.html'
})
export class CondensedTable {
  @Input() data: Array<any>;
  peopleTableData: Array<any>;

  constructor() {
  }
  ngOnInit() {
    let arr: any[] = [];
    for (let ix in this.data) {
      arr.push(JSON.parse(this.data[ix]));
    }
    this.peopleTableData = arr;

  }
}
