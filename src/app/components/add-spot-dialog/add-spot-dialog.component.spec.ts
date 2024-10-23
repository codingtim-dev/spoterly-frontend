import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpotDialogComponent } from './add-spot-dialog.component';

describe('AddSpotDialogComponent', () => {
  let component: AddSpotDialogComponent;
  let fixture: ComponentFixture<AddSpotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSpotDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
