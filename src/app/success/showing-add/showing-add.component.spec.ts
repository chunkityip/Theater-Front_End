import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingAddComponent } from './showing-add.component';

describe('ShowingAddComponent', () => {
  let component: ShowingAddComponent;
  let fixture: ComponentFixture<ShowingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowingAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
