import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialHomeComponent } from './social-home.component';

describe('SocialHomeComponent', () => {
  let component: SocialHomeComponent;
  let fixture: ComponentFixture<SocialHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
