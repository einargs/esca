import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListMasterComponent } from './shopping-list-master.component';

describe('ShoppingListMasterComponent', () => {
  let component: ShoppingListMasterComponent;
  let fixture: ComponentFixture<ShoppingListMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
