import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { QuizService } from 'src/app/service/quiz.service';
import { QuizFormComponent } from './quiz-form.component';

describe('QuizFormComponentTest', () => {
  let fixture: ComponentFixture<QuizFormComponent>;
  let component: QuizFormComponent;
  let debugElement: DebugElement;
  let quizService: QuizService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        QuizFormComponent
      ],
      providers: [
        QuizService,
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
    fixture = TestBed.createComponent(QuizFormComponent);
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

  it('should display the empty form', waitForAsync(() => {
    const spy = spyOn(quizService, 'findQuizById').and.returnValue(of({ id: null, name: null }));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(1);

      expect(component.quiz).toEqual({ id: null, name: null });

      expect(debugElement.query(By.css('#name')).nativeElement.value).toEqual('');
      expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Save');
    });
  }));

  it('should display quiz in form', waitForAsync(() => {
    const spy = spyOn(quizService, 'findQuizById').and.returnValue(of({ id: 1, name: 'Quiz' }));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(1);

      expect(component.quiz).toEqual({ id: 1, name: 'Quiz' });

      expect(debugElement.query(By.css('#name')).nativeElement.value).toEqual('Quiz');
      expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Update');
    });
  }));

  it('should display the error message', waitForAsync(() => {
    const spy1 = spyOn(quizService, 'findQuizById').and.returnValue(throwError({ error: { message: 'No quiz with id 1' } }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith('No quiz with id 1');
      expect(spy3).toHaveBeenCalledWith('/quizzes/form');
    });
  }));

  it('should save quiz', waitForAsync(() => {
    component.quiz = { id: null, name: 'Quiz A' };

    const spy1 = spyOn(quizService, 'saveQuiz').and.returnValue(of({ id: 1, name: 'Quiz A' }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith({ id: null, name: 'Quiz A' });
      expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Saved.');
      expect(spy3).toHaveBeenCalledWith('/quizzes/form/1');
    });

    component.saveQuiz();
  }));

  it('should update quiz', waitForAsync(() => {
    component.quiz = { id: 1, name: 'Quiz' };

    const spy1 = spyOn(quizService, 'updateQuiz').and.returnValue(of({ id: 1, name: 'Quiz A' }));
    const spy2 = spyOn(window, 'alert');

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith({ id: 1, name: 'Quiz' });
      expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Updated.');

      expect(component.quiz).toEqual({ id: 1, name: 'Quiz A' });
    });

    component.updateQuiz();
  }));

});