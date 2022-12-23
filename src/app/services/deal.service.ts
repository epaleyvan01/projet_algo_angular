import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deal } from '../class/deal';
import { DealForm } from '../class/form';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get('assets/data/mango_hemle.json');
  }

  async choiceBestPlan(form:DealForm, data:Deal[]){
    let newTab = await data.filter(item => {
      return item.price <= form.price
    })
    let resultTab = [];
    let prio = [form.priority.sms, form.priority.call, form.priority.data]

    for(let item of newTab){
      for(let i = 0; i < prio.length - 1; i++){
        if(prio[i] > 0 && prio[i] <= 3 && form.validity <= item.validity){
          resultTab.push(item)
        }
      }
    }
    console.log(resultTab);
  }

  
}
