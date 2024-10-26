import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PenalizaziyuekComponent } from './penalizaziyuek.component';

describe('PenalizaziyuekComponent', () => {
  let component: PenalizaziyuekComponent;
  let fixture: ComponentFixture<PenalizaziyuekComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PenalizaziyuekComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PenalizaziyuekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
