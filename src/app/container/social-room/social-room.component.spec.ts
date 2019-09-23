import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRoomComponent } from './social-room.component';

describe('SocialRoomComponent', () => {
  let component: SocialRoomComponent;
  let fixture: ComponentFixture<SocialRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
