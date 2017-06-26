import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ChartsAPI } from './../../../chartsAPI.services';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'autocomplete-overviewProvider',
  templateUrl: 'searcherProvider.html',
})
export class AutocompleteOverviewProvider {
  stateCtrl: FormControl;
  filteredStates: any;
  dbdata: Observable<JSON[]>;
  active: boolean;
  @Output() getid = new EventEmitter();

  states = [
  ];
  states_db = [];
  constructor(private _chartAPI: ChartsAPI) {
    this.active = false;
    this._chartAPI.getProviders()
      .subscribe(
      data => {
        this.dbdata = data['data'];

        let list: string[] = [];
        this.dbdata.forEach(variable => {
          list.push(JSON.stringify(variable));
        });
        let data_product: string[] = [];
        for (let i = 0; i < list.length; i++) {
          let data_db = JSON.parse(list[i]);

          let name = data_db.name;
          let id = data_db.ID;
          //states_id[name] = id;
          //console.log(states_id);
          this.states.push(name);
          this.states_db.push(data_db);

        }


        this.active = true;
        this.stateCtrl = new FormControl();
        let nombre: any;
        this.filteredStates = this.stateCtrl.valueChanges
          .startWith(null)
          .map(name => this.filterStates(name));
      });


  }

  /*  set_id(product: any) {
      console.log(product);
      for(let i = 0; i< this.states_db.length; i++) {
        if(this.states_db[i]==)
      }
      this.get_id.emit({id: id})
    }*/
  filterStates(val: string) {
    console.log(val);
    console.log(this.states_db);
    for (let i = 0; i < this.states_db.length; i++) {
      if (this.states_db[i].name === val) {
        const id = this.states_db[i].rut;
        console.log(id);
        this.getid.emit({ id: id });
      }
    }
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.states;
  }
  /*  get_id(name: any) {

      for (let i = 0; i < this.states_db.length; i++) {
        if (this.states_db[i].name) {
          return this.states_db[i].ID;
        }
      }
      return null;
    }
  */
}
