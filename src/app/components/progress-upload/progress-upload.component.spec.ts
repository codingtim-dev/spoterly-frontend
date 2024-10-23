import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressUploadComponent } from './progress-upload.component';

describe('ProgressUploadComponent', () => {
  let component: ProgressUploadComponent;
  let fixture: ComponentFixture<ProgressUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
