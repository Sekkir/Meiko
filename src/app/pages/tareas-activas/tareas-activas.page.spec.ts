import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasActivasPage } from './tareas-activas.page';

describe('TareasActivasPage', () => {
  let component: TareasActivasPage;
  let fixture: ComponentFixture<TareasActivasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasActivasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
