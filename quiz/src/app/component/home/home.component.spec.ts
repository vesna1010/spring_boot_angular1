import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { QuizService } from 'src/app/service/quiz.service';

describe('HomeComponentTest', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let debugElement: DebugElement;
  let quizService: QuizService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        QuizService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    quizService = TestBed.get(QuizService);
    router = TestBed.get(Router);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display "Loading data. Please wait..."', () => {
    fixture.detectChanges();

    expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('Loading data. Please wait...');
  });

  it('should display "There is no quizzes for play."', waitForAsync(() => {
    const spy1 = spyOn(quizService, 'findAllQuizzes').and.returnValue(of([]));
    const spy2 = spyOn(localStorage, 'removeItem');

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledWith('quiz');

      expect(component.quizzes).toEqual([]);

      const divElement = debugElement.query(By.css('div')).nativeElement;

      expect(divElement.textContent).toEqual('There is no quizzes for play.');
    });
  }));

  it('should display quizzes in table', waitForAsync(() => {
    const spy1 = spyOn(quizService, 'findAllQuizzes').and.returnValue(of([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]));
    const spy2 = spyOn(localStorage, 'removeItem');

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledWith('quiz');

      expect(component.quizzes).toEqual([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]);

      const optionElements = debugElement.queryAll(By.css('option')).map((element) => element.nativeElement);

      expect(optionElements.length).toEqual(2);
      expect(optionElements[0].textContent).toEqual('Quiz A');
      expect(optionElements[1].textContent).toEqual('Quiz B');
    });
  }));

  it('sholuld navigate to "/play"', () => {
    component.quiz = { id: 1, name: 'Quiz' };

    const spy1 = spyOn(localStorage, 'setItem');
    const spy2 = spyOn(router, 'navigateByUrl');

    component.setQuiz();

    expect(spy1).toHaveBeenCalledWith('quiz', JSON.stringify({ id: 1, name: 'Quiz' }));
    expect(spy2).toHaveBeenCalledWith('/play');
  });

});