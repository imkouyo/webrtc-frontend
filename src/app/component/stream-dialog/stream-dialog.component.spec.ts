import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamDialogComponent } from './stream-dialog.component';

describe('StreamDialogComponent', () => {
  let component: StreamDialogComponent;
  let fixture: ComponentFixture<StreamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
