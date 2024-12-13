import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LikedSpotsComponent} from './liked-spots.component';

describe('LikedSpotsComponent', () => {
  let component: LikedSpotsComponent;
  let fixture: ComponentFixture<LikedSpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedSpotsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LikedSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
