/*
Archivo encargado de realizar todas las peticiones a API https://coimco.herokuapp.com
*/
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
  /*
  * @returns HEADERS de la conexión con API.{Authorization and Accept}.
  */
  createHeaders(): any {
    const auth = `Bearer ${this.token}`;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', auth);
    const options = new RequestOptions({ 'headers': headers });
    return options;
  }
  /*
  * @params filtros utilizado para la petición a la base de datos
  * @returns body del mensaje (filtro) enviado a la API
  */
  createBody(filter: JSON): any {
    const start = filter['start'] + 'T10:00:00Z';
    const end = filter['end'] + 'T10:00:00Z';
    let body = JSON.stringify({ start: start, end: end });
    return body;
  }


  /***********PRODUCTS************/

  /*
  * @params filtro con fechas y la cantidad 'k' de muestras a retornar por API.
  * @returns Observable de la conexión dentro de este se encuentran las 'k' muestras solicitadas
   */
  getBestSeller(filter: JSON) {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    const url = 'https://coimco.herokuapp.com/api/productsrank-k/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega los k productos más vendidos por categoría
  * @params filtro con fechas, la cantidad 'k' y la categoría de productos de muestras a retornar por API.
  * @returns Observable de la conexión dentro de este se encuentran las 'k' muestras solicitadas
   */
  getRankCategory(filter: JSON): Observable<JSON[]> {

    const category = filter['category'];
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const url = 'https://coimco.herokuapp.com/api/productsrank-cs/' + k + '/' + category;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega los k productos más vendidos por marca
  * @params filtro con fechas, la cantidad 'k' y la marca de productos de muestras a retornar por API.
  * @returns Observable de la conexión dentro de este se encuentran las 'k' muestras solicitadas
   */
  getRankBran(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const brand = filter['brand'];
    let k;
    for (var ix in filter) {
      if (ix === '[object Object]' && filter[ix]) {
        k = filter[ix];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/productsrank-b/' + k + '/' + brand;
    let body = this.createBody(filter);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  //METHOD USING IN searcherProduct.component
  /* Método que entrega todos los productos
  * @returns Observable de la conexión dentro de este se encuentran todos los productos.
   */
  getProducts(): Observable<JSON[]> {
    const headers = this.createHeaders();
    const url = 'http://coimco.herokuapp.com/api/products';
    return this.http.get(url, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el historial de venta de un producto
  * @params filtro con fechas y id del producto que se desea consultar.
  * @returns Observable de la conexión dentro de este se encuentran las ventas del producto.
   */
  getProductSales(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();

    const id = filter['id'];
    const url = 'https://coimco.herokuapp.com/api/productsrec/' + id;
    let body = this.createBody(filter);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el precio de venta de producto elegido
  * @params filtro con fechas y el id del producto que se desea consultar.
  * @returns Observable de la conexión dentro de este se encuentra la fecha y precio de venta del producto elegido.
   */
  getProductPrice(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const id = filter['id'];
    const url = 'https://coimco.herokuapp.com/api/salesrec-p/' + id;
    let body = this.createBody(filter);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de proveedores, con información de estos, y el precio al que venden del producto elegido.
  * @params filtro con fechas y id del producto elegido.
  * @returns Observable de la conexión dentro de este se encuentra la información de los proveedores del producto elegido.
   */
  getRankPPrice(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const id = filter['id'];
    const url = 'https://coimco.herokuapp.com/api/productsrank-pp/' + id;
    let body = this.createBody(filter);


    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /* Método que entrega el precio de compra de producto elegido
  * @params filtro con fechas y el id del producto que se desea consultar.
  * @returns Observable de la conexión dentro de este se encuentra la fecha y precio de compra del producto elegido.
   */
  getProductPriceTime(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const id = filter['id'];
    const url = 'https://coimco.herokuapp.com/api/salesrec-p/' + id;
    let body = this.createBody(filter);
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  /* PROVIDERS */
  //METHOD USING IN searcherProduct.component
  /* Método que entrega todos los productos
  * @returns Observable de la conexión dentro de este se encuentran todos los productos.
   */
  getProviders(): Observable<JSON[]> {
    const headers = this.createHeaders();
    const url = 'http://coimco.herokuapp.com/api/providers';
    return this.http.get(url, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega las compras de un producto en el tiempo por categoria
  * @params filtro con fechas, los 'k' productos y la categoria del producto que se desea consultar.
  * @returns Observable de la conexión dentro de este se encuentra la fecha y el total de compras de los productos de la categoria elegida.
   */
  getRankProviderTime(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    console.log(filter);
    const id = filter['category'];
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/purchasesrank-cp/' + k + '/' + id;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de top 'k' compras.
  * @params filtro con fechas y las top 'k' compras.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del proveedor y producto, cantidad, precio y total acumulado de compra.
   */
  getRankPurchase(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/purchasesrank-k/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega los 'k' productos comprados al proveedor elegido.
  * @params filtro con fechas , los 'k' productos y el id del proveedor.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del producto y el precio.
   */
  getRankProviderPP(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    const k = filter['k'];
    const id = filter['id'];
    const url = 'http://coimco.herokuapp.com/api/providersrank-pp/' + k + '/' + id;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega los proveedores de mayor solicitud.
  * @params filtro con fechas y los 'k' proveedores.
  * @returns Observable de la conexión dentro de este se encuentra toda la información de contacto de proveedor.
   */
  getRankProviderP(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/providersrank-v/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega los 'k' productos más comprados por categoría.
  * @params filtro con fechas, los 'k' productos y el nombre de la categoria elegida.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del producto y la cantidad comprada.
   */
  getRankPurchaseC(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    const category = filter['category'];
    const url = 'http://coimco.herokuapp.com/api/productsrank-cp/' + k + '/' + category;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de 'k' proveedores por su tiempo de despacho.
  * @params filtro con fechas y  los 'k' proveedores
  * @returns Observable de la conexión dentro de este se encuentra el nombre del producto y la cantidad comprada.
   */
  getProviderTime(filter: JSON) {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/providersrank-k/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  /* CUSTOMERS */
  /* Método que entrega a todos los clientes
  * @returns Observable de la conexión dentro de este se encuentra el nombre y id de todos los clientes
   */
  getCustomers(): Observable<JSON[]> {
    const headers = this.createHeaders();
    const url = 'http://coimco.herokuapp.com/api/customers';
    return this.http.get(url, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el monto total ingresado por un cliente elegido.
  * @params filtro con fechas y  los 'k' proveedores
  * @returns Observable de la conexión dentro de este se encuentra el nombre y el total acumulado por ventas a el cliente elegido.
   */
  getCollected(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    //const k = filter['k'];
    const id = filter['id'];
    const url = 'http://coimco.herokuapp.com/api/customersrec-c/' + id;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de productos comprados por el cliente elegido
  * @params filtro con fechas y el id del cliente elegido
  * @returns Observable de la conexión dentro de este se encuentra el nombre del product y el monto total comprado por el cliente.
   */
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
  /* Método que entrega la frecuencia de compra del cliente en veces por mes
  * @params filtro con fechas y los 'k' clientes que se desean.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del cliente y la frequencia de compra en terminos de veces por mes
   */
  getFrequency(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    //const k = filter['k'];
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/customersrank-f/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de clientes por total ingresado por ventas
  * @params filtro con fechas y los 'k' clientes que se solicitan.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del cliente junto con el total de veces que compro y el total acumulado de dinero.
   */
  getRankCustomer(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var prop in filter) {
      if (prop === '[object Object]' && filter[prop]) {
        k = filter[prop];
      }
    }
    //const id = filter['id'];
    const url = 'http://coimco.herokuapp.com/api/customersrank-k/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de 'k' clientes que compraron los 'L' productos más vendidos de la empresa
  * @params filtro con fechas, los 'k' clientes que se solicitan y los 'L' produtos más vendidos.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del cliente, su rut y la cantidad comprada.
   */
  getCustomerBP(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    console.log(filter);
    let k;
    let l = '10';
    for (var ix in filter) {
      if (ix === '[object Object]' && filter[ix]) {
        k = filter[ix];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/customersrank-p/' + k + '/' + l;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de 'k' productos por su rentabilidad.
  * @params filtro con fechas y los 'k' productos que se solicitan.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del producto y la rentabilidad de este.
   */
  getRankingCollected(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (let ix in filter) {
      if (ix === '[object Object]' && filter[ix]) {
        k = filter[ix];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/productsrank-r/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de clientes por veces de compras y total acumulado ingresado
  * @params filtro con fechas y los 'k' clientes que se solicitan.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del cliente, el total de compras y el total acumulado de ingreso.
   */
  getRankTotalSale(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var ix in filter) {
      if (ix === '[object Object]' && filter[ix]) {
        k = filter[ix];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/customersrank-k/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de clientes por veces de compras
  * @params filtro con fechas y los 'k' clientes que se solicitan.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del cliente y el total de compras.
   */
  getCustomersByProduct(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);

    let k;
    for (var ix in filter) {
      if (ix === '[object Object]' && filter[ix]) {
        k = filter[ix];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/customersrank-v/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de clientes por  monto total acumulado de compras.
  * @params filtro con fechas y los 'k' clientes que se solicitan.
  * @returns Observable de la conexión dentro de este se encuentra el nombre del cliente y el total acumulado por las compras.
   */
  getRankingSale(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var ix in filter) {
      if (ix === '[object Object]' && filter[ix]) {
        k = filter[ix];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/salesrank-k/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de 'k' productos vendidos por categoría.
  * @params filtro con fechas y los 'k' productos que se solicitan.
  * @returns Observable de la conexión dentro de este se encuentra el nombre de los productos y el total vendido.
   */
  getRankingSaleCategory(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var ix in filter) {
      if (ix === '[object Object]' && filter[ix]) {
        k = filter[ix];
      }
    }
    const category = filter['category'];
    const url = 'http://coimco.herokuapp.com/api/salesrank-c/' + k + '/' + category;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el ranking de 'k' productos de mayor ingreso para la empresa
  * @params filtro con fechas y los 'k' productos que se solicitan.
  * @returns Observable de la conexión dentro de este se encuentra el nombre de los productos y el total ingresado.
   */
  getRankingSaleProduct(filter: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody(filter);
    let k;
    for (var ix in filter) {
      if (ix === '[object Object]' && filter[ix]) {
        k = filter[ix];
      }
    }
    const url = 'http://coimco.herokuapp.com/api/salesrank-p/' + k;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error:
        any) => Observable.throw(error.json().error || 'Server error'));
  }
  /* Método que entrega el monto total ingresado entre fechas elegidas.
  * @params filtro con fechas.
  * @returns Observable de la conexión dentro de este se encuentra el total ingresado por ventas.
   */
  getSalesRecord(): Observable<JSON[]> {
    const headers = this.createHeaders();
    const start = '2016-01-01T10:00:00Z';
    const end = '2017-06-01T10:00:00Z';
    const body = JSON.stringify({ start: start, end: end });
    //const body = this.createBody(filter);
    const url = 'http://coimco.herokuapp.com/api/sales-total';
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



}
