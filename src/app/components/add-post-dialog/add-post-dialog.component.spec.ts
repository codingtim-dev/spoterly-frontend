import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostDialogComponent } from './add-post-dialog.component';

describe('AddSpotDialogComponent', () => {
  let component: AddPostDialogComponent;
  let fixture: ComponentFixture<AddPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
