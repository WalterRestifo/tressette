import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardDialogComponent } from './single-card-dialog.component';

describe('SingleCardDialogComponent', () => {
  let component: SingleCardDialogComponent;
  let fixture: ComponentFixture<SingleCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
