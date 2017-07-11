/**
* Component de ProductBuy
*/
import { Component, OnInit } from '@angular/core';
import { ChartRankCategoryService } from './chartRankCategory.services';
import { NgForm } from '@angular/forms';
import {MdButtonModule} from '@angular/material';
@Component({
  selector: 'chartrank-category',
  templateUrl: './chartRankCategory.html',
  styleUrls: ['./../../chartistJsProduct.scss'],
})

export class ChartRankCategory implements OnInit {
  data: any;
  active: boolean;
  dbdata: any;
  value: number;
  startDate = new Date('2015/01/01');
  endDate = Date.now();
  category_default: string;
  categories = [
    { value: 'Accesorios', viewValue: 'Accesorios' },
    { value: 'Conectividad', viewValue: 'Conectividad' },
    { value: 'Servidores', viewValue: 'Servidores' },
    { value: 'Computadores', viewValue: 'Computadores' },
    { value: 'Almacenamiento', viewValue: 'Almacenamiento' },
    { value: 'Gabinetes', viewValue: 'Gabinetes' },
    { value: 'Racks', viewValue: 'Racks' },
  ];
  constructor(private _chartRankCategoryService: ChartRankCategoryService) {

  }
  /**
  * función ngOnInit, función lanzada en paralelo a la carga de la página
  */
  ngOnInit() {
    //this.data = this._chartRankCategoryService.getAll();
    this.category_default = 'Accesorios';
    this.active = false;
    this.value = 5;

  }
  /**
  * Función de conversión Responsive
  */
  getResponsive(padding, offset) {
    return this._chartRankCategoryService.getResponsive(padding, offset);
  }
  /**
  * Función onSubmit, se envía el formulario a función del services que se encarga de realizar llamada a API y envíar los datos de esta al gráfico mediante la función setData().
  * @param f:NgForm, formulario creado con NgModel.
  */
  onSubmit(f: NgForm) {
    this.active = false;
    this._chartRankCategoryService.getCategory(f.value).subscribe(
      data => {
        this.dbdata = data['data'];
        //this.data=this._chartRankCategory.setData(this.dbdata);
        this.active = true;
        this.data = this._chartRankCategoryService.setData(this.dbdata);



      },
      err => {
        console.log(err)
      });
  }
}
