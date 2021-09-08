import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionService } from 'src/app/service/question.service';
import { PlayQuizComponent } from './play-quiz.component';
import { ShowQuestionComponent } from '../show-question/show-question.component';
import { of } from 'rxjs';
import { Answer } from 'src/app/enum/answer.enum';
import { Points } from 'src/app/enum/points.enum';
import { Router } from '@angular/router';

describe('PlayQuizComponentTest', () => {
  let fixture: ComponentFixture<PlayQuizComponent>;
  let component: PlayQuizComponent;
  let debugElement: DebugElement;
  let questionService: QuestionService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        PlayQuizComponent,
        ShowQuestionComponent
      ],
      providers: [
        QuestionService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayQuizComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    questionService = TestBed.get(QuestionService);
    router = TestBed.get(Router);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display the first question', waitForAsync(() => {
    const spy1 = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ id: 1, name: 'Quiz' }));
    const spy2 = spyOn(questionService, 'findQuestionsByQuiz').and.returnValue(of([{
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    }, {
      id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    }
    ]));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith('quiz');
      expect(spy2).toHaveBeenCalledWith({ id: 1, name: 'Quiz' }, 3);

      expect(component.quiz).toEqual({ id: 1, name: 'Quiz' });
      expect(component.questions).toEqual([{
        id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
      }, {
        id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
      }
      ]);
      expect(component.numberOfQuestion).toEqual(0);
      expect(component.score).toEqual(0);

      const spanElements: HTMLSpanElement[] = debugElement.queryAll(By.css('span')).map(el => el.nativeElement);
      const questionElements = debugElement.queryAll(By.css('.text-center')).map(el => el.nativeElement);
      const buttonElements = debugElement.queryAll(By.css('.btn-primary')).map(el => el.nativeElement);

      expect(spanElements[0].textContent).toEqual('Playing : Quiz');
      expect(spanElements[1].textContent).toEqual('Question : 1');
      expect(spanElements[2].textContent).toEqual('Points : 0');
      expect(questionElements[0].textContent).toEqual('Question A');
      expect(questionElements[1].textContent).toEqual('Answer A');
      expect(questionElements[2].textContent).toEqual('Answer B');
      expect(questionElements[3].textContent).toEqual('Answer C');
      expect(questionElements[4].textContent).toEqual('Answer D');
      expect(buttonElements[0].textContent).toEqual('Next Question');
      expect(buttonElements[1].textContent).toEqual('Change Quiz');
    });
  }));

  it('should redirect to home', waitForAsync(() => {
    const spy1 = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(null));
    const spy2 = spyOn(router, 'navigateByUrl');

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith('quiz');
      expect(spy2).toHaveBeenCalledWith('/');

      expect(component.quiz).toBeNull();
      expect(component.questions).toBeUndefined();
      expect(component.numberOfQuestion).toEqual(0);
      expect(component.score).toEqual(0);
    });
  }));

  it('should add points', () => {
    component.score = 10;

    component.addPoints(10);

    expect(component.score).toEqual(20);
  });

  it('should set the second question', () => {
    component.numberOfQuestion = 1;

    component.nextQuestion();

    expect(component.numberOfQuestion).toEqual(2);
  });

});
