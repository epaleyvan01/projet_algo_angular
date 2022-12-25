import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Deal } from 'src/app/class/deal';
import { DealForm } from 'src/app/class/form';
import { MsgError } from 'src/app/class/msgerror';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-bestdeals',
  templateUrl: './bestdeals.component.html',
  styleUrls: ['./bestdeals.component.scss']
})
export class BestdealsComponent implements OnInit {

  progression:number = 0;
  step:number = 1;
  formdata!:FormGroup
  dealForm:DealForm = new DealForm()
  msgError:MsgError = new MsgError()
  list!:Deal[];
  result:Deal[] = [];
  isNotDone:boolean = true;
  finalCSS!:string

  constructor(private dealServ:DealService) { }

  async ngOnInit() {
    this.formdata = new FormGroup({
      sms: new FormControl(),
      call: new FormControl(),
      data: new FormControl(),
      validity: new FormControl(),
      price: new FormControl()
    })
    
    await this.dealServ.getAll().subscribe((data) => {
      this.listPackageSort(data)
    })
    this.finalCSS = "progress-bar-striped progress-bar-animated";
  }

  listPackageSort(rep:any){
    rep.sort((a:Deal, b:Deal) => {
      if(a.price < b.price){
        return -1
      }else if(a.price > b.price){
        return 1
      }
      return 0
    })
    this.list = rep
  }

  async onNextStep(val:number, data:any){
    if(val == 2){
      let rep = await this.validatePriority(data);
      if(rep){
        this.step = val;
        this.progression+=33.4;
      }
    }else if(val == 3){
      let rep = await this.validateValidity(data);
      if(rep){
        this.step = val;
        this.progression+=33.4;
      }
    }else if(val == 4){
      let rep = await this.validatePrice(data);
      if(rep){
        this.step = val;
        this.progression+=33.4;
        this.showBestDeal();
      }
    }
  }

  onPreviousStep(val:number){
    if(val == 1 && this.progression >= 100){
      this.step = 1;
      this.progression = 0;
      this.finalCSS = "progress-bar-striped progress-bar-animated"
    }else{
      this.step = val;
      this.progression-=33.4;
    }
  }

  validatePriority(data:any){
    let isDone = true;
    if(data.sms == undefined){
      this.msgError.sms = "Select a priority for sms"
      this.msgError.sms_color = "border-danger"
      isDone = false
    }else{
      this.msgError.sms = ""
      this.msgError.sms_color = "border-success"
      this.dealForm.priority.sms = parseInt(data.sms)
    }

    if(data.call == undefined){
      this.msgError.call = "Select a priority for call"
      this.msgError.call_color = "border-danger"
      isDone = false
    }else{
      this.msgError.call = ""
      this.msgError.call_color = "border-success"
      this.dealForm.priority.call = parseInt(data.call)
    }

    if(data.data == undefined){
      this.msgError.data = "Select a priority for data"
      this.msgError.data_color = "border-danger"
      isDone = false
    }else{
      this.msgError.data = ""
      this.msgError.data_color = "border-success"
      this.dealForm.priority.data = parseInt(data.data)
    }
    return isDone;
  }

  validateValidity(data:any){
    let isDone = true;
    if(data.validity == undefined){
      this.msgError.validity = "select a validity"
      this.msgError.validity_color = "border-danger"
      isDone = false
    }else{
      this.msgError.validity = ""
      this.msgError.validity_color = "border-success"
      this.dealForm.validity = parseInt(data.validity);
    }
    return isDone;
  }

  validatePrice(data:any){
    let isDone = true;
    if(data.price == undefined){
      this.msgError.price = "Enter an amount"
      this.msgError.price_color = "border-danger"
      isDone = false
    }else if(parseInt(data.price) < 50){
      this.msgError.price = "Enter an amount equal or bigger than 50"
      this.msgError.price_color = "border-danger"
      isDone = false
    }else{
      this.msgError.price = ""
      this.msgError.price_color = "border-success"
      this.dealForm.price = parseInt(data.price);
    }
    return isDone;
  }

  async showBestDeal(){
    this.result = await this.dealServ.choiceBestPlan(this.dealForm ,this.list);
    this.isNotDone = false;
    this.finalCSS = "bg-success"
  }
}
