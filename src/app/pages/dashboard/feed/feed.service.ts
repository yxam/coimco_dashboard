import {Injectable} from '@angular/core';

@Injectable()
export class FeedService {

  private _data = [
 {
       type: 'text-message',
      author: 'Nasta',
      surname: 'Linnie',
      header: 'Posted new message',
      text: 'Haha lol',
      time: '11.11.2015',
      ago: '2 days ago',
      expanded: false,
    }, {
      type: 'geo-message',
      author: 'Nick',
      surname: 'Cat',
      header: 'Posted location',
      text: '"New York, USA"',
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
      text: "First snake: I hope I'm not poisonous. Second snake: Why? First snake: Because I bit my lip!",
      time: '12.11.2015',
      ago: '3 days ago',
      expanded: false,
    }, {
      type: 'text-message',
      author: 'Andrey',
      surname: 'Hrabouski',
      header: 'Posted new message',
      text: 'How do you smuggle an elephant across the border? Put a slice of bread on each side, and call him "lunch".',
      time: '14.11.2015',
      ago: '5 days ago',
      expanded: false,
    }, {
      type: 'text-message',
      author: 'Nasta',
      surname: 'Linnie',
      header: 'Posted new message',
      text: 'When your hammer is C++, everything begins to look like a thumb.',
      time: '14.11.2015',
      ago: '5 days ago',
      expanded: false,
    }
  ];

  getData() {
    return this._data;
  }
}
