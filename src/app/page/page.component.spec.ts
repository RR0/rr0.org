import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageComponent} from './page.component';
import {ActivatedRoute} from '@angular/router';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  const fakeActivatedRoute = <any>{
    snapshot: {data: {p: 'myPage'}},
    subscribe: () =>{}
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
