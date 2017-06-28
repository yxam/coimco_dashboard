import {Component, Input} from '@angular/core';

//import {BasicTablesService} from '../../basicTables.service';

@Component({
  selector: 'striped-tablePurchase',
  templateUrl: './stripedTable.html'
})
export class StripedTablePurchase {
  @Input() smartTableData: Array<any>;
  //smartTableData:Array<any>;

  constructor() {
    console.log(this.smartTableData);
    //this.smartTableData = _basicTablesService.smartTableData;
  }
}
