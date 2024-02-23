import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoparceladoComponent } from './cartaoparcelado.component';

describe('CartaoparceladoComponent', () => {
  let component: CartaoparceladoComponent;
  let fixture: ComponentFixture<CartaoparceladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartaoparceladoComponent]
    });
    fixture = TestBed.createComponent(CartaoparceladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
