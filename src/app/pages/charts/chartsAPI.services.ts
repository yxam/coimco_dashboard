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


  /*PRODUCTS*/
  getBestSeller(filter: JSON) {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    const url = 'https://coimco.herokuapp.com/api/productsrank-k/' + k;
    console.log(headers);
    console.log(body);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRankCategory(filter: JSON): Observable<JSON[]> {

    const category = filter['category'];
    const k = filter['k'];
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const url = 'https://coimco.herokuapp.com/api/productsrank-cs/' + k + '/' + category;
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
  //METHOD USING IN searcherProduct.component
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
    const id = filter['id'];
    const url = 'https://coimco.herokuapp.com/api/productsrec/' + id;
    let body = this.createBody(filter);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProductPrice(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const id = filter['id'];
    const url = 'https://coimco.herokuapp.com/api/salesrec-p/' + id;
    let body = this.createBody(filter);
    console.log(body);
    console.log(url);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  /* PROVIDERS */
  //METHOD USING IN searcherProduct.component
  getProviders(): Observable<JSON[]> {
    const headers = this.createHeaders();
    const url = 'http://coimco.herokuapp.com/api/providers';
    console.log(url);
    return this.http.get(url, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRankProviderTime(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const id = filter['id'];
    const k = filter['k'];
    const url = 'http://coimco.herokuapp.com/api/providersrank-pp/' + k + '/' + id;
    console.log(url);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getRankPurchase(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    const url = 'http://coimco.herokuapp.com/api/purchasesrank-k/' + k;
    console.log(url);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getRankProviderPP(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    const id = filter['id'];
    const url = 'http://coimco.herokuapp.com/api/providersrank-pp/' + k + '/' + id;
    console.log(url);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getRankProviderP(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    const url = 'http://coimco.herokuapp.com/api/providersrank-v/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getRankPurchaseC(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    const category = filter['category'];
    const url = 'http://coimco.herokuapp.com/api/productsrank-cp/' + k + '/' + category;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getProviderTime(filter: JSON) {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    const url = 'http://coimco.herokuapp.com/api/providersrank-k/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /* CUSTOMERS */
  getCustomers(): Observable<JSON[]> {
    const headers = this.createHeaders();
    const url = 'http://coimco.herokuapp.com/api/customers';
    return this.http.get(url, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getRankProductCustomer(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    //const k = filter['k'];
    const id = filter['id'];
    const url = 'http://coimco.herokuapp.com/api/customersrec-p/' + id;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getRankCustomer(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    //const id = filter['id'];
    const url = 'http://coimco.herokuapp.com/api/customersrank-k/' + k;
    console.log(url);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getCustomerBP(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    const l = filter['l'];
    const url = 'http://coimco.herokuapp.com/api/customersrank-p/' + k + '/' + l;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
