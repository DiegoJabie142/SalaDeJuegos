import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaLaBanderaGameComponent } from './adivina-la-bandera-game.component';

describe('AdivinaLaBanderaGameComponent', () => {
  let component: AdivinaLaBanderaGameComponent;
  let fixture: ComponentFixture<AdivinaLaBanderaGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdivinaLaBanderaGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdivinaLaBanderaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
