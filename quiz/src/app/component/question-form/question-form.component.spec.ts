import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { QuizService } from 'src/app/service/quiz.service';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionFormComponent } from './question-form.component';
import { Answer } from 'src/app/enum/answer.enum';
import { Points } from 'src/app/enum/points.enum';
import { ToArrayPipe } from 'src/app/pipe/to-array.pipe';

describe('QuestionFormComponentTest', () => {
  let fixture: ComponentFixture<QuestionFormComponent>;
  let component: QuestionFormComponent;
  let debugElement: DebugElement;
  let quizService: QuizService;
  let questionService: QuestionService;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        QuestionFormComponent,
        ToArrayPipe
      ],
      providers: [
        QuizService,
        QuestionService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1
              }
            }
          }
        }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    quizService = debugElement.injector.get(QuizService);
    questionService = debugElement.injector.get(QuestionService);
    router = debugElement.injector.get(Router);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display "Loading data. Please wait..."', () => {
    fixture.detectChanges();

    expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('Loading data. Please wait...');
  });

  it('should display the empty form', waitForAsync(() => {
    const spy1 = spyOn(questionService, 'findQuestionById').and.returnValue(of({
      id: null, text: null, answerA: null, answerB: null, answerC: null, answerD: null, correctAnswer: null,
      points: null, quiz: null
    }));
    const spy2 = spyOn(quizService, 'findAllQuizzes').and.returnValue(of([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]));;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalled();

      expect(component.quizzes).toEqual([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]);
      expect(component.question).toEqual({
        id: null, text: null, answerA: null, answerB: null, answerC: null, answerD: null, correctAnswer: null,
        points: null, quiz: null
      });

      const optionElements: DebugElement[] = debugElement.queryAll(By.css('#quiz option'));

      expect(optionElements.length).toEqual(2);
      expect(optionElements[0].nativeElement.textContent).toEqual('Quiz A');
      expect(optionElements[1].nativeElement.textContent).toEqual('Quiz B');
      expect(debugElement.query(By.css('#text')).nativeElement.value).toEqual('');
      expect(debugElement.query(By.css('#answerA')).nativeElement.value).toEqual('');
      expect(debugElement.query(By.css('#answerB')).nativeElement.value).toEqual('');
      expect(debugElement.query(By.css('#answerC')).nativeElement.value).toEqual('');
      expect(debugElement.query(By.css('#answerD')).nativeElement.value).toEqual('');
      expect(debugElement.query(By.css('#correctAnswer')).nativeElement.value).toEqual('');
      expect(debugElement.query(By.css('#points')).nativeElement.value).toEqual('');
      expect(debugElement.query(By.css('#quiz')).nativeElement.selectedIndex).toEqual(-1);
      expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Save');
    });
  }));

  it('should display question in form', waitForAsync(() => {
    const spy1 = spyOn(questionService, 'findQuestionById').and.returnValue(of({
      id: 1, text: 'Question', answerA: 'A', answerB: 'B', answerC: 'C', answerD: 'D',
      correctAnswer: Answer.B, quiz: { id: 1, name: 'Quiz A' }, points: Points.FIFTY
    }));
    const spy2 = spyOn(quizService, 'findAllQuizzes').and.returnValue(of([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]));;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalled();

      expect(component.quizzes).toEqual([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]);
      expect(component.question).toEqual({
        id: 1, text: 'Question', answerA: 'A', answerB: 'B', answerC: 'C', answerD: 'D',
        correctAnswer: Answer.B, quiz: { id: 1, name: 'Quiz A' }, points: Points.FIFTY
      });

      const debugElements: DebugElement[] = debugElement.queryAll(By.css('#quiz option'));

      expect(debugElements.length).toEqual(2);
      expect(debugElements[0].nativeElement.textContent).toEqual('Quiz A');
      expect(debugElements[1].nativeElement.textContent).toEqual('Quiz B');
      expect(debugElement.query(By.css('#text')).nativeElement.value).toEqual('Question');
      expect(debugElement.query(By.css('#answerA')).nativeElement.value).toEqual('A');
      expect(debugElement.query(By.css('#answerB')).nativeElement.value).toEqual('B');
      expect(debugElement.query(By.css('#answerC')).nativeElement.value).toEqual('C');
      expect(debugElement.query(By.css('#answerD')).nativeElement.value).toEqual('D');
      expect(debugElement.query(By.css('#correctAnswer')).nativeElement.value).toEqual('B');
      expect(debugElement.query(By.css('#points')).nativeElement.value).toEqual('50');
      expect(debugElement.query(By.css('#quiz')).nativeElement.selectedIndex).toEqual(0);
      expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Update');
    });
  }));

  it('should display the error message', waitForAsync(() => {
    const spy1 = spyOn(questionService, 'findQuestionById').and.returnValue(throwError({ error: { message: 'No question with id 1' } }));;
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith('No question with id 1');
      expect(spy3).toHaveBeenCalledWith('/questions/form');
    });

    component.ngOnInit();
  }));

  it('should save question', waitForAsync(() => {
    component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];
    component.question = {
      id: null, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
    };

    const spy1 = spyOn(questionService, 'saveQuestion').and.returnValue(of({
      id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
    }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith({
        id: null, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
      });
      expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Saved.');
      expect(spy3).toHaveBeenCalledWith('/questions/form/1');
    });

    component.saveQuestion();
  }));

  it('should update question', waitForAsync(() => {
    component.question = {
      id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
    };
    component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];

    const spy1 = spyOn(questionService, 'updateQuestion').and.returnValue(of({
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
    }));
    const spy2 = spyOn(window, 'alert');

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith({
        id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
      });
      expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Updated.');

      expect(component.question).toEqual({
        id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
      });
      expect(component.quizzes.length).toEqual(2);
    });

    component.updateQuestion();
  }));

});