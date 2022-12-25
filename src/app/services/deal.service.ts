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
    
    let resultTab:Deal[] = new Array(10);
    for(let i = 0; i < 10; i++){
      resultTab[i] = new Deal();
      resultTab[i].price = form.price
    }
    let amount = form.price;

    if(form.priority.sms == form.priority.call && form.priority.sms == form.priority.data){
      
      for(let i = newTab.length-1; i >= 0; i--){
        for(let j = 0; j < resultTab.length; j++){
          if(amount - newTab[i].price >= 0){
            if(resultTab[j].sms < newTab[i].sms && resultTab[j].calls < newTab[i].calls && resultTab[j].data < newTab[i].data && resultTab[j].price >= newTab[i].price){   
              resultTab[j] = newTab[i];   
              amount-=newTab[i].price;
            }
          }
        }
      }
      
    }else if(form.priority.sms > form.priority.call && form.priority.sms > form.priority.data){

      for(let i = newTab.length-1; i >= 0; i--){
        for(let j = 0; j < resultTab.length; j++){
          if(amount - newTab[i].price >= 0){
            if(resultTab[j].sms < newTab[i].sms && resultTab[j].calls <= newTab[i].calls && resultTab[j].data <= newTab[i].data && resultTab[j].price >= newTab[i].price){   
              resultTab[j] = newTab[i];   
              amount-=newTab[i].price;
            }
          }
        }
      }

    }else if(form.priority.sms == form.priority.call && form.priority.sms > form.priority.data){

      for(let i = newTab.length-1; i >= 0; i--){
        for(let j = 0; j < resultTab.length; j++){
          if(amount - newTab[i].price >= 0){
            if(resultTab[j].sms < newTab[i].sms && resultTab[j].calls < newTab[i].calls && resultTab[j].data <= newTab[i].data && resultTab[j].price >= newTab[i].price){   
              resultTab[j] = newTab[i];   
              amount-=newTab[i].price;
            }
          }
        }
      }

    }else if(form.priority.sms > form.priority.call && form.priority.sms == form.priority.data){

      for(let i = newTab.length-1; i >= 0; i--){
        for(let j = 0; j < resultTab.length; j++){
          if(amount - newTab[i].price >= 0){
            if(resultTab[j].sms < newTab[i].sms && resultTab[j].calls <= newTab[i].calls && resultTab[j].data < newTab[i].data && resultTab[j].price >= newTab[i].price){   
              resultTab[j] = newTab[i];   
              amount-=newTab[i].price;
            }
          }
        }
      }

    }else if(form.priority.call > form.priority.sms && form.priority.call > form.priority.data){
      
      for(let i = newTab.length-1; i >= 0; i--){
        for(let j = 0; j < resultTab.length; j++){
          if(amount - newTab[i].price >= 0){
            if(resultTab[j].sms <= newTab[i].sms && resultTab[j].calls < newTab[i].calls && resultTab[j].data <= newTab[i].data && resultTab[j].price >= newTab[i].price){   
              resultTab[j] = newTab[i];   
              amount-=newTab[i].price;
            }
          }
        }
      }

    }else if(form.priority.call > form.priority.sms && form.priority.call == form.priority.data){
      
      for(let i = newTab.length-1; i >= 0; i--){
        for(let j = 0; j < resultTab.length; j++){
          if(amount - newTab[i].price >= 0){
            if(resultTab[j].sms <= newTab[i].sms && resultTab[j].calls < newTab[i].calls && resultTab[j].data < newTab[i].data && resultTab[j].price >= newTab[i].price){   
              resultTab[j] = newTab[i];   
              amount-=newTab[i].price;
            }
          }
        }
      }

    }else if(form.priority.data > form.priority.sms && form.priority.data > form.priority.call){
      
      for(let i = newTab.length-1; i >= 0; i--){
        for(let j = 0; j < resultTab.length; j++){
          if(amount - newTab[i].price >= 0){
            if(resultTab[j].sms <= newTab[i].sms && resultTab[j].calls <= newTab[i].calls && resultTab[j].data < newTab[i].data && resultTab[j].price >= newTab[i].price){   
              resultTab[j] = newTab[i];   
              amount-=newTab[i].price;
            }
          }
        }
      }

    }
    resultTab = resultTab.filter(elt => elt.validity >= form.validity);
    return resultTab;
  }

  
}
