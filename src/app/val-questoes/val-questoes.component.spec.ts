import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValQuestoesComponent } from './val-questoes.component';

describe('ValQuestoesComponent', () => {
  let component: ValQuestoesComponent;
  let fixture: ComponentFixture<ValQuestoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValQuestoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
