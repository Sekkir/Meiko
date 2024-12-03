import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudianteRecomPage } from './estudiante-recom.page';

describe('EstudianteRecomPage', () => {
  let component: EstudianteRecomPage;
  let fixture: ComponentFixture<EstudianteRecomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteRecomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
