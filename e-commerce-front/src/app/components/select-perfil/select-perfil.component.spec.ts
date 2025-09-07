import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPerfilComponent } from './select-perfil.component';

describe('SelectPerfilComponent', () => {
  let component: SelectPerfilComponent;
  let fixture: ComponentFixture<SelectPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
