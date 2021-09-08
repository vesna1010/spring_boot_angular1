import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponentTest', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        PaginationComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display "2, 3, 4, 5 , 6"', () => {
    component.url = '/test-url';
    component.pageNumber = 5;
    component.pageSize = 10;
    component.pageSort = ['id', 'name'];
    component.totalPages = 6;

    component.ngOnChanges();

    fixture.detectChanges();

    const aElements: HTMLAnchorElement[] = debugElement.queryAll(By.css('a')).map((el) => el.nativeElement);

    expect(aElements.length).toEqual(7);
    expect(aElements[0].textContent).toEqual('Previous');
    expect(aElements[1].textContent).toEqual('2');
    expect(aElements[2].textContent).toEqual('3');
    expect(aElements[3].textContent).toEqual('4');
    expect(aElements[4].textContent).toEqual('5');
    expect(aElements[5].textContent).toEqual('6');
    expect(aElements[6].textContent).toEqual('Next');

    expect(aElements[0].parentElement.classList).not.toContain('disabled');
    expect(aElements[5].parentElement.classList).toContain('active');
    expect(aElements[6].parentElement.classList).toContain('disabled');

    expect(aElements[0].href).toContain('/test-url?page=4&size=10&sort=id&sort=name');
    expect(aElements[1].href).toContain('/test-url?page=1&size=10&sort=id&sort=name');
    expect(aElements[2].href).toContain('/test-url?page=2&size=10&sort=id&sort=name');
    expect(aElements[3].href).toContain('/test-url?page=3&size=10&sort=id&sort=name');
    expect(aElements[4].href).toContain('/test-url?page=4&size=10&sort=id&sort=name');
    expect(aElements[5].href).toContain('/test-url?page=5&size=10&sort=id&sort=name');
    expect(aElements[6].href).toContain('/test-url?page=6&size=10&sort=id&sort=name');
  });

});

