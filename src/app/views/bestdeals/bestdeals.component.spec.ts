import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { BestdealsComponent } from './bestdeals.component';
import { DealService } from 'src/app/services/deal.service';

describe('BestdealsComponent', () => {
  let component: BestdealsComponent;
  let fixture: ComponentFixture<BestdealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestdealsComponent ],
      imports: [HttpClientTestingModule],
      providers: [DealService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
