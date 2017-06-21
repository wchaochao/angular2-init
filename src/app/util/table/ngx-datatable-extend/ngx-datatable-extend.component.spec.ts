import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatatableExtendComponent } from './ngx-datatable-extend.component';

describe('NgxDatatableExtendComponent', () => {
  let component: NgxDatatableExtendComponent;
  let fixture: ComponentFixture<NgxDatatableExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDatatableExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDatatableExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
