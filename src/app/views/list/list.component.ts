import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/class/deal';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  deals!:any
  displayedPack:Deal[] = []
  isNotDone:boolean = true

  constructor(private dealService:DealService) { }

  async ngOnInit() {
    await this.dealService.getAll().subscribe((data) => {
      this.deals = data;
      this.loadPackage();
      this.isNotDone = false;
    })
  }

  loadPackage(){
    this.displayedPack = this.deals;
  }

  handleChange(event:any){
    let text = event.target.value.toLowerCase();
    if(text == '' || text == ' '){
      this.loadPackage();
    }else{
      this.displayedPack = this.deals.filter((item:Deal) => item.name.toLowerCase().includes(text));
    }
  }

}
