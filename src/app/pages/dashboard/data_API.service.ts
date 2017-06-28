import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Data_API {
  token: string;
  data_json: any;


  constructor(private http: Http, private jsonp: Jsonp) {
    this.token = localStorage.getItem('tokenUser');
  }
  private extractData(res: Response) {
    const body = res.json();
    console.log(body.data);
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  createHeaders() {
    const tokenuser = JSON.parse(this.token);
    const auth = `Bearer ${tokenuser}`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', auth);
    const options = new RequestOptions({ 'headers': headers });
    return options;
  }

  createBody() {
    //AQUI QUEDE CREAR EL BODY AÚN NO SABEMOS SI ES NECESARIO
    return null;
  }
  getStats(currentUser: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody();
    const user_id = currentUser['name'];
    const role = currentUser['role'];
    const url = 'https://coimco.herokuapp.com/api/dashboard-info/' + role + '/' + user_id;
    //const url = 'http://coimco.herokuapp.com/api/products';
    return this.http.get(url, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  getStatstrafficChart(): Observable<JSON[]> {
    const headers = this.createHeaders();
    //const body = this.createBody();
    //const user_id = currentUser['name'];
    //const role = currentUser['role'];
    const k = '5';
    const start = '2015-01-01T10:00:00Z';
    const end = '2017-06-01T10:00:00Z';
    let body = JSON.stringify({ start: start, end: end });
    const url = 'https://coimco.herokuapp.com/api/productsrank-r/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProviders(): Observable<JSON[]> {
    const headers = this.createHeaders();
    const k = '5';
    const start = '2012-01-01T10:00:00Z';
    const end = '2013-01-01T10:00:00Z';
    let body = JSON.stringify({ start: start, end: end });
    const url = 'https://coimco.herokuapp.com/api/providersrank-v/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
