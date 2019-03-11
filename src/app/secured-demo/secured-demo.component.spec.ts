import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredDemoComponent } from './secured-demo.component';

describe('SecuredDemoComponent', () => {
  let component: SecuredDemoComponent;
  let fixture: ComponentFixture<SecuredDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuredDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuredDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
