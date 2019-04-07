import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersTableComponent } from './workers-table.component';

describe('WorkersTableComponent', () => {
  let component: WorkersTableComponent;
  let fixture: ComponentFixture<WorkersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
