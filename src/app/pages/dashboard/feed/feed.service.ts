import {Injectable} from '@angular/core';

@Injectable()
export class FeedService {

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
    }
  ];

  getData() {
    return this._data;
  }
}
