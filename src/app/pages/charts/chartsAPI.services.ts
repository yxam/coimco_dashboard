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
  createHeaders(): any {
    const auth = `Bearer ${this.token}`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', auth);
    const options = new RequestOptions({ 'headers': headers });
    return options;
  }
  createBody(filter: JSON): any {
    const start = filter['start'] + 'T10:00:00Z';
    const end = filter['end'] + 'T10:00:00Z';
    let body = JSON.stringify({ start: start, end: end });
    return body;
  }
  getRankCategory(filter: JSON): Observable<JSON[]> {

    const category = filter['category'];
    const k = filter['k'];
    const headers = this.createHeaders();
    let body = this.createBody(filter);
    console.log(headers);
    console.log(body);
    const url = 'https://coimco.herokuapp.com/api/productsrank-cs/' + k + '/' + category;
    console.log(url);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRankBran(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const brand = filter['brand'];
    const k = filter['k'];
    const url = 'http://coimco.herokuapp.com/api/productsrank-b/' + k + '/' + brand;
    let body = this.createBody(filter);
    console.log(body);
    console.log(url);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  //
  getProducts(): Observable<JSON[]> {
    const headers = this.createHeaders();
    const url = 'http://coimco.herokuapp.com/api/products';
    console.log(url);
    return this.http.get(url, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProductSales(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const id = filter['product'];
    const url = 'https://coimco.herokuapp.com/api/productsrec/' + id;
    let body = this.createBody(filter);
    console.log(body);
    console.log(url);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
