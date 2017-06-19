import {Component} from '@angular/core';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
currentUser: any;
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
