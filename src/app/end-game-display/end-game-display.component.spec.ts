import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameDisplayComponent } from './end-game-display.component';

describe('EndGameDisplayComponent', () => {
  let component: EndGameDisplayComponent;
  let fixture: ComponentFixture<EndGameDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndGameDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
