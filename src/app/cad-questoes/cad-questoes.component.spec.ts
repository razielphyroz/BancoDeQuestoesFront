import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadQuestoesComponent } from './cad-questoes.component';

describe('CadQuestoesComponent', () => {
  let component: CadQuestoesComponent;
  let fixture: ComponentFixture<CadQuestoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadQuestoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
