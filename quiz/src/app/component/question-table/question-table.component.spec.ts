import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionTableComponent } from './question-table.component';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { Answer } from 'src/app/enum/answer.enum';
import { Points } from 'src/app/enum/points.enum';

describe('QuestionTableComponentTest', () => {
  let fixture: ComponentFixture<QuestionTableComponent>;
  let component: QuestionTableComponent;
  let debugElement: DebugElement;
  let questionService: QuestionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        QuestionTableComponent,
        PaginationComponent
      ],
      providers: [
        QuestionService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              page: 0,
              size: 10,
              sort: ['id']
            })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    questionService = TestBed.get(QuestionService);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display "Loading data. Please wait..."', () => {
    fixture.detectChanges();

    expect(debugElement.query(By.css('tbody')).nativeElement.textContent).toEqual('Loading data. Please wait...');
  });

  it('should display "No data"', waitForAsync(() => {
    const spy = spyOn(questionService, 'findAllQuestions').and.returnValue(of({ content: [], number: 0, size: 10, totalPages: 0 }));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id'] });

      expect(component.page).toEqual({ content: [], number: 0, size: 10, totalPages: 0 });
      expect(component.pageable).toEqual({ page: 0, size: 10, sort: ['id'] });

      const tableBodyElement = debugElement.query(By.css('tbody')).nativeElement;
      const paginationElement = debugElement.query(By.css('app-pagination'));

      expect(tableBodyElement.textContent).toEqual('No Data');
      expect(paginationElement).toBeNull();
    });
  }));

  it('should display questions in table', waitForAsync(() => {
    const spy = spyOn(questionService, 'findAllQuestions').and.returnValue(of({
      content: [{
        id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
      }, {
        id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
      }], number: 0, size: 10, totalPages: 1
    }));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id'] });

      expect(component.page).toEqual({
        content: [{
          id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
          answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
        }, {
          id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
          answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
        }], number: 0, size: 10, totalPages: 1
      });
      expect(component.pageable).toEqual({ page: 0, size: 10, sort: ['id'] });


      const paginationElement = debugElement.query(By.css('app-pagination'));
      const debugElements = debugElement.queryAll(By.css('td')).map((el) => el.nativeElement);

      expect(paginationElement).toBeDefined();
      expect(debugElements[1].textContent).toEqual('Question A');
      expect(debugElements[11].textContent).toEqual('Question B');
    });
  }));

  it('should delete question', waitForAsync(() => {
    const spy1 = spyOn(questionService, 'deleteQuestionById').and.returnValue(of(null));
    const spy2 = spyOn(questionService, 'findAllQuestions').and.returnValue(of({
      number: 0,
      size: 10,
      totalPages: 1,
      content: [
        {
          id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
          answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
        }]
    }));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id'] });

      expect(component.page).toEqual({
        content: [{
          id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
          answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
        }], number: 0, size: 10, totalPages: 1
      });
      expect(component.pageable).toEqual({ page: 0, size: 10, sort: ['id'] });

      const paginationElement = debugElement.query(By.css('app-pagination')).nativeElement;
      const debugElements = debugElement.queryAll(By.css('td')).map((element) => element.nativeElement);

      expect(paginationElement).toBeDefined();
      expect(debugElements[1].textContent).toEqual('Question B');
    });

    component.deleteQuestionById(1);
  }));

});
