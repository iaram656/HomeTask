import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PenalizaziyoDanakComponent } from './penalizaziyo-danak.component';

describe('PenalizaziyoDanakComponent', () => {
  let component: PenalizaziyoDanakComponent;
  let fixture: ComponentFixture<PenalizaziyoDanakComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PenalizaziyoDanakComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PenalizaziyoDanakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
