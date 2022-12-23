import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuActive:string[] = ['active', '', '']
  
  constructor() {
  }

  ngOnInit(): void {
  }

  onSetActive(menu:any){
    for(let i in this.menuActive){
      if(i == menu){
        this.menuActive[i] = 'active';
      }else{
        this.menuActive[i] = '';
      }
    }
  }

}
