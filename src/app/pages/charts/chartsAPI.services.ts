import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChartsAPI {
  token: JSON;
  data_json: any;

  constructor(private http: Http, private jsonp: Jsonp) {
    this.token = JSON.parse(localStorage.getItem('tokenUser'));
  }

  getBestSeller( filter: JSON ): Observable<JSON[]> {
    const auth = `Bearer ${this.token}`;
    const headers = new Headers() ;
    headers.append('Accept', 'application/json');
    headers.append('Authorization', auth);
    const options = new RequestOptions({ 'headers': headers });
    return this.http.get('https://coimco.herokuapp.com/api/products', options)
                    .map((res : Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));


    }
}
