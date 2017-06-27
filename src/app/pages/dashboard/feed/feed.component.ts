import {Component} from '@angular/core';

import {FeedService} from './feed.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss']
})
export class Feed {

  public feed: Array<Object>;
  dbdata: any;
  constructor(private _feedService: FeedService) {
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage(message) {
    message.expanded = !message.expanded;
  }
  private _loadFeed() {
    this._feedService.getDataProviders()
      .subscribe(
      data => {
        this.dbdata = data['data'];
        //this.feed = this._feedService.getData();
        this.feed = this._feedService.setData(this.dbdata);
      }
      );


  }
}
