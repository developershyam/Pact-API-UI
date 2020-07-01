import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachDeleteComponent } from './serach-delete.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('SerachDeleteComponent', () => {
  let component: SerachDeleteComponent;
  let fixture: ComponentFixture<SerachDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      providers: [HttpClient],
      declarations: [SerachDeleteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerachDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
