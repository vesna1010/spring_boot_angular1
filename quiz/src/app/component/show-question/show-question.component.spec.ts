import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Answer } from 'src/app/enum/answer.enum';
import { Points } from 'src/app/enum/points.enum';
import { ShowQuestionComponent } from './show-question.component';

describe('ShowQuestionComponentTest', () => {
  let fixture: ComponentFixture<ShowQuestionComponent>;
  let component: ShowQuestionComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ShowQuestionComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuestionComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display question', () => {
    component.question = {
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    };

    fixture.detectChanges();

    const textElement = debugElement.query(By.css('.text-center')).nativeElement;
    const answerElements = debugElement.queryAll(By.css('.answer')).map((element) => element.nativeElement);


    expect(textElement.textContent).toEqual('Question A');
    expect(textElement.classList).toContain('text-white');
    expect(textElement.classList).not.toContain('text-success');
    expect(textElement.classList).not.toContain('text-danger');

    expect(answerElements[0].lastChild.textContent).toEqual('Answer A');
    expect(answerElements[1].lastChild.textContent).toEqual('Answer B');
    expect(answerElements[2].lastChild.textContent).toEqual('Answer C');
    expect(answerElements[3].lastChild.textContent).toEqual('Answer D');

    expect(answerElements[0].classList).not.toContain('disable-click');
    expect(answerElements[1].classList).not.toContain('disable-click');
    expect(answerElements[2].classList).not.toContain('disable-click');
    expect(answerElements[3].classList).not.toContain('disable-click');

    expect(answerElements[0].classList).not.toContain('bg-success');
    expect(answerElements[1].classList).not.toContain('bg-success');
    expect(answerElements[2].classList).not.toContain('bg-success');
    expect(answerElements[3].classList).not.toContain('bg-success');

    expect(answerElements[0].classList).not.toContain('bg-danger');
    expect(answerElements[1].classList).not.toContain('bg-danger');
    expect(answerElements[2].classList).not.toContain('bg-danger');
    expect(answerElements[3].classList).not.toContain('bg-danger');
  });

  it('should display correct answer', () => {
    component.question = {
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    };
    component.answer = Answer.A;

    fixture.detectChanges();

    const textElement = debugElement.query(By.css('.text-center')).nativeElement;
    const answerElements = debugElement.queryAll(By.css('.answer')).map((element) => element.nativeElement);

    expect(textElement.textContent).toEqual('CORRECT');
    expect(textElement.classList).not.toContain('text-white');
    expect(textElement.classList).toContain('text-success');
    expect(textElement.classList).not.toContain('text-danger');

    expect(answerElements[0].classList).toContain('disable-click');
    expect(answerElements[1].classList).toContain('disable-click');
    expect(answerElements[2].classList).toContain('disable-click');
    expect(answerElements[3].classList).toContain('disable-click');

    expect(answerElements[0].classList).toContain('bg-success');
    expect(answerElements[1].classList).not.toContain('bg-success');
    expect(answerElements[2].classList).not.toContain('bg-success');
    expect(answerElements[3].classList).not.toContain('bg-success');

    expect(answerElements[0].classList).not.toContain('bg-danger');
    expect(answerElements[1].classList).not.toContain('bg-danger');
    expect(answerElements[2].classList).not.toContain('bg-danger');
    expect(answerElements[3].classList).not.toContain('bg-danger');
  });

  it('should display incorrect answer', () => {
    component.question = {
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    };
    component.answer = Answer.C;

    fixture.detectChanges();

    const textElement = debugElement.query(By.css('.text-center')).nativeElement;
    const answerElements = debugElement.queryAll(By.css('.answer')).map((element) => element.nativeElement);

    expect(textElement.textContent).toEqual('INCORRECT');
    expect(textElement.classList).not.toContain('text-white');
    expect(textElement.classList).not.toContain('text-success');
    expect(textElement.classList).toContain('text-danger');

    expect(answerElements[0].classList).toContain('disable-click');
    expect(answerElements[1].classList).toContain('disable-click');
    expect(answerElements[2].classList).toContain('disable-click');
    expect(answerElements[3].classList).toContain('disable-click');

    expect(answerElements[0].classList).toContain('bg-success');
    expect(answerElements[1].classList).not.toContain('bg-success');
    expect(answerElements[2].classList).not.toContain('bg-success');
    expect(answerElements[3].classList).not.toContain('bg-success');

    expect(answerElements[0].classList).not.toContain('bg-danger');
    expect(answerElements[1].classList).not.toContain('bg-danger');
    expect(answerElements[2].classList).toContain('bg-danger');
    expect(answerElements[3].classList).not.toContain('bg-danger');
  });

  it('should check the user answer', () => {
    component.question = {
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    };

    component.eventEmmiter.subscribe((points: number) => {
      expect(points).toEqual(10);
    });

    component.checkAnswer(Answer.A);

    expect(component.answer).toEqual(Answer.A);
  });

  it('should remove the user answer', () => {
    component.answer = Answer.A;

    component.ngOnChanges();

    expect(component.answer).toEqual(null);
  });

});
