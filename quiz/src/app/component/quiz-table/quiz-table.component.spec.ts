import { DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { QuizService } from 'src/app/service/quiz.service';
import { QuizTableComponent } from './quiz-table.component';

describe('QuizTableComponentTest', () => {
  let fixture: ComponentFixture<QuizTableComponent>;
  let component: QuizTableComponent;
  let debugElement: DebugElement;
  let quizService: QuizService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        QuizTableComponent
      ],
      providers: [
        QuizService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    quizService = TestBed.get(QuizService);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display "Loading data. Please wait..."', () => {
    fixture.detectChanges();

    expect(debugElement.query(By.css('tbody')).nativeElement.textContent).toEqual('Loading data. Please wait...');
  });

  it('should display "No data"', waitForAsync(() => {
    const spy = spyOn(quizService, 'findAllQuizzes').and.returnValue(of([]));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();

      expect(component.quizzes).toEqual([]);

      const tableBodyElement = debugElement.query(By.css('tbody')).nativeElement;

      expect(tableBodyElement.textContent).toEqual('No Data');
    });
  }));

  it('should display quizzes in table', waitForAsync(() => {
    const spy = spyOn(quizService, 'findAllQuizzes').and.returnValue(of([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();

      expect(component.quizzes).toEqual([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]);

      const tdElements = debugElement.queryAll(By.css('td')).map((el) => el.nativeElement);

      expect(tdElements[1].textContent).toEqual('Quiz A');
      expect(tdElements[4].textContent).toEqual('Quiz B');
    });
  }));

  it('should delete quiz', waitForAsync(() => {
    const spy1 = spyOn(quizService, 'deleteQuizById').and.returnValue(of(null));
    const spy2 = spyOn(quizService, 'findAllQuizzes').and.returnValue(of([{ id: 2, name: 'Quiz B' }]));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalled();

      expect(component.quizzes).toEqual([{ id: 2, name: 'Quiz B' }]);

      const tdElements = debugElement.queryAll(By.css('td')).map((el) => el.nativeElement);

      expect(tdElements[1].textContent).toEqual('Quiz B');
    });

    component.deleteQuizById(1);
  }));

});