import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorMenorGameComponent } from './mayor-menor-game.component';

describe('MayorMenorGameComponent', () => {
  let component: MayorMenorGameComponent;
  let fixture: ComponentFixture<MayorMenorGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayorMenorGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MayorMenorGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
