import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeSuccessComponent } from './mensaje-success.component';

describe('MensajeSuccessComponent', () => {
  let component: MensajeSuccessComponent;
  let fixture: ComponentFixture<MensajeSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
