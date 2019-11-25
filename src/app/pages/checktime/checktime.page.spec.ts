import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChecktimePage } from './checktime.page';

describe('ChecktimePage', () => {
  let component: ChecktimePage;
  let fixture: ComponentFixture<ChecktimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecktimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChecktimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
