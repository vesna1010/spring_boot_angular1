import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableStyleDirective } from './table-style.directive';

@Component({
  template: `<table tableStyle>
				    <thead>
					   <tr><th>ID</th><th>NAME</th></tr>
					</thead>
					<tbody>
					    <tr *ngFor="let quiz of quizzes">
						   <td>{{quiz.id}}</td>
						   <td>{{quiz.name}}</td>
						</tr>
					</tbody>
				</table>`
})
class TableStyleTestComponent {
  quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];
}

describe('TableStyleDirective', () => {
  let fixture: ComponentFixture<TableStyleTestComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableStyleDirective,
        TableStyleTestComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStyleTestComponent);
    debugElement = fixture.debugElement;
  });

  it('table should have 3 classes', () => {
    const tableElement = debugElement.query(By.css('table')).nativeElement;
    const divElement = tableElement.parentElement;

    expect(tableElement.classList).toContain('table');
    expect(tableElement.classList).toContain('table-striped');
    expect(tableElement.classList).toContain('table-bordered');
    expect(divElement.classList).toContain('table-responsive');
  });

});