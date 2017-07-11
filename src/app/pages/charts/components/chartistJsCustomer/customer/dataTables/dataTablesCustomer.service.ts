import {Injectable} from '@angular/core';
import { ChartsAPI } from './../../../../chartsAPI.services';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class DataTablesCustomerService {


  provider: any[] = [];
  constructor(
    private _chartAPI: ChartsAPI,
  ) { }
  /**
  * Función encargada de llamar al services encargado de comunicarse con la API.
  * @return Observable con todos los customers
  */
  getCustomers() {
    return this._chartAPI.getCustomers();
  }
  /**
  * Función encargada de setear datos de tabla
  * @return Datos de tabla.
  */
  setData(dataCustomer: any) {
    let list: string[] = [];
    dataCustomer.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    let data_table: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const data_db = JSON.parse(list[i]);
      const name = data_db.name;
      const mail = data_db.mail;
      const phone = data_db.phone;

      const obj: any = {
        'name': name,
        'email': mail,
        'phone': phone,
        //'city': 'Kobbegem',

      }


      this.provider.push(obj);
    }
    return this.provider;

    //return this._chartAPI.getRankProviderP();
  }
  /*
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.dataTableData);
      }, 2000);
    });
  }*/
}
