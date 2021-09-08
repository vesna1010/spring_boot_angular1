import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';
import { Answer } from '../enum/answer.enum';
import { Points } from '../enum/points.enum';

describe('QuestionServiceTest', () => {
  const URL = 'http://localhost:8080/quiz-service/questions';

  let questionService: QuestionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuestionService
      ]
    });
  });

  beforeEach(() => {
    questionService = TestBed.get(QuestionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create service', () => {
    expect(questionService).toBeDefined();
  });

  it('should retrive questions by quiz', () => {
    const quiz = { id: 1, name: 'Quiz' };

    questionService.findQuestionsByQuiz(quiz, 2).subscribe((questions) => {
      expect(questions.length).toEqual(2);
      expect(questions[0].text).toEqual('Question A');
      expect(questions[1].text).toEqual('Question B');
    });

    const request = httpMock.expectOne(`${URL}/quiz/1?size=2`);

    expect(request.request.method).toBe('GET');

    request.flush([
      {
        id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: quiz
      }, {
        id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
        answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: quiz
      }]);

    httpMock.verify();
  });

  it('should retrive questions by page', () => {
    const pageable = { page: 1, size: 20, sort: ['text'] };

    questionService.findAllQuestions(pageable).subscribe((page) => {
      const questions = page.content;

      expect(questions.length).toEqual(2);
      expect(questions[0].text).toEqual('Question A');
      expect(questions[1].text).toEqual('Question B');
    });

    const request = httpMock.expectOne(`${URL}?page=1&size=20&sort=text`);

    expect(request.request.method).toBe('GET');

    request.flush({
      content: [
        {
          id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
          answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz A' }
        }, {
          id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
          answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz A' }
        }], number: 1, size: 20, totalPages: 2, first: false, last: true
    });

    httpMock.verify();
  });

  it('should retrive questions by page', () => {
    questionService.findAllQuestions().subscribe((page) => {
      const questions = page.content;

      expect(questions.length).toEqual(2);
      expect(questions[0].text).toEqual('Question A');
      expect(questions[1].text).toEqual('Question B');
    });

    const request = httpMock.expectOne(`${URL}?page=0&size=10&sort=id`);

    expect(request.request.method).toBe('GET');

    request.flush({
      content: [
        {
          id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
          answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz A' }
        }, {
          id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
          answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz A' }
        }], number: 0, size: 10, totalPages: 1, first: true, last: true
    });

    httpMock.verify();
  });


  it('should retrive question by id', () => {
    questionService.findQuestionById(1).subscribe((question) => {
      expect(question.text).toEqual('Question A');
    });

    const request = httpMock.expectOne(`${URL}/1`);

    expect(request.request.method).toBe('GET');

    request.flush({
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    });

    httpMock.verify();
  });

  it('should save question', () => {
    const question =
    {
      id: null, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    };

    questionService.saveQuestion(question).subscribe((question) => {
      expect(question.id).toEqual(1);
    });

    const request = httpMock.expectOne(URL);

    expect(request.request.method).toBe('POST');

    request.flush({
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    });

    httpMock.verify();
  });

  it('should update question', () => {
    const question =
    {
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    };

    questionService.updateQuestion(question).subscribe((question) => {
      expect(question.text).toEqual('Question A');
    });

    const request = httpMock.expectOne(`${URL}/1`);

    expect(request.request.method).toBe('PUT');

    request.flush({
      id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
      answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
    });

    httpMock.verify();
  });

  it('should delete question by id', () => {
    questionService.deleteQuestionById(1).subscribe((question) => {
      expect(question).toEqual(null);
    });

    const request = httpMock.expectOne(`${URL}/1`);

    expect(request.request.method).toBe('DELETE');

    request.flush(null);

    httpMock.verify();
  });

});