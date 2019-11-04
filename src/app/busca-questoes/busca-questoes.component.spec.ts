import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaQuestoesComponent } from './busca-questoes.component';

describe('BuscaQuestoesComponent', () => {
  let component: BuscaQuestoesComponent;
  let fixture: ComponentFixture<BuscaQuestoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaQuestoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
