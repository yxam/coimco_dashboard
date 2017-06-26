import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Data_API } from './../data_API.service';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedService {
  dbdata: JSON[] = [];

  private _data = [
    {
      type: 'text-message',
      author: 'Nasta',
      surname: 'Linnie',
      header: 'Posted new message',
      phone: '+56923412',
      street: 'Av Ejercito 1234',
      time: '11.11.2015',
      ago: '2 days ago',
      expanded: false,
      photo: '1',
    }, {
      type: 'geo-message',
      author: 'Nick',
      surname: 'Cat',
      header: 'Posted location',
      phone: '+569823712',
      street: 'Av Ossa 1234',
      preview: 'app/feed/new-york-location.png',
      link: 'https://www.google.by/maps/place/New+York,+NY,+USA/@40.7201111,-73.9893872,14z',
      time: '11.11.2015',
      ago: '2 days ago',
      expanded: false,
      photo: '1',
    }, {
      type: 'text-message',
      author: 'Vlad',
      surname: 'Lugovsky',
      header: 'Posted new message',
      phone: '+569155521',
      street: 'Las carmelitas 14',
      time: '12.11.2015',
      ago: '3 days ago',
      expanded: false,
      photo: '1',
    }, {
      type: 'text-message',
      author: 'Andrey',
      surname: 'Hrabouski',
      header: 'Posted new message',
      phone: '+569938283',
      street: 'Gran avenida 1233',
      time: '14.11.2015',
      ago: '5 days ago',
      expanded: false,
      photo: '1',
    }, {
      type: 'text-message',
      author: 'Nasta',
      surname: 'Linnie',
      header: 'Posted new message',
      phone: '+569976543',
      street: 'Irrarazabal 28382',
      time: '14.11.2015',
      ago: '5 days ago',
      expanded: false,
      photo: '1',
    }
  ];
  constructor(private _data_pieChart: Data_API) {

  }
  getDataProviders(): Observable<JSON[]> {
    return this._data_pieChart.getProviders();
  }
  setData(dbdata: Array<JSON>) {
    console.log(dbdata);
    let list: string[] = [];
    dbdata.forEach(variable => {
      list.push(JSON.stringify(variable))
    });
    console.log(list);
    let data_chart: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const data_db = JSON.parse(list[i]);
      this._data[i].author = data_db.Name;
      this._data[i].street = data_db.Mail;
      this._data[i].phone = data_db.Phone;
      this._data[i].surname = 'Productos comprados: ' + data_db.Quantity;
      this._data[i].photo = '' + i;
    }
    console.log(this._data);
    return this._data;

  }
  getData() {
    return this._data;
  }
}
