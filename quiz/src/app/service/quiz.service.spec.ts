import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';

describe('QuizServiceTest', () => {
  const URL = 'http://localhost:8080/quiz-service/quizzes';

  let quizService: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuizService
      ]
    });
  });

  beforeEach(() => {
    quizService = TestBed.get(QuizService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create service', () => {
    expect(quizService).toBeDefined();
  });

  it('should retrive quizzes', () => {
    const sort = { sort: ['name'] };

    quizService.findAllQuizzes(sort).subscribe((quizzes) => {
      expect(quizzes.length).toEqual(2);
      expect(quizzes[0].name).toEqual('Quiz A');
      expect(quizzes[1].name).toEqual('Quiz B');
    });

    const request = httpMock.expectOne(`${URL}?sort=name`);

    expect(request.request.method).toBe('GET');

    request.flush([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]);

    httpMock.verify();
  });

  it('should retrive quizzes', () => {
    quizService.findAllQuizzes().subscribe((quizzes) => {
      expect(quizzes.length).toEqual(2);
      expect(quizzes[0].name).toEqual('Quiz A');
      expect(quizzes[1].name).toEqual('Quiz B');
    });

    const request = httpMock.expectOne(`${URL}?sort=id`);

    expect(request.request.method).toBe('GET');

    request.flush([{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]);

    httpMock.verify();
  });

  it('should retrive quiz by id', () => {
    quizService.findQuizById(1).subscribe((quiz) => {
      expect(quiz.name).toEqual('Quiz A');
    });

    const request = httpMock.expectOne(`${URL}/1`);

    expect(request.request.method).toBe('GET');

    request.flush({ id: 1, name: 'Quiz A' });

    httpMock.verify();
  });

  it('should save quiz', () => {
    const quiz = { id: null, name: 'Quiz A' };

    quizService.saveQuiz(quiz).subscribe((quiz) => {
      expect(quiz.id).toEqual(1);
    });

    const request = httpMock.expectOne(URL);

    expect(request.request.method).toBe('POST');

    request.flush({ id: 1, name: 'Quiz A' });

    httpMock.verify();
  });

  it('should update quiz', () => {
    const quiz = { id: 1, name: 'Quiz A' };

    quizService.updateQuiz(quiz).subscribe((quiz) => {
      expect(quiz.name).toEqual('Quiz A');
    });

    const request = httpMock.expectOne(`${URL}/1`);

    expect(request.request.method).toBe('PUT');

    request.flush({ id: 1, name: 'Quiz A' });

    httpMock.verify();
  });

  it('should delete quiz by id', () => {
    quizService.deleteQuizById(1).subscribe((quiz) => {
      expect(quiz).toEqual(null);
    });

    const request = httpMock.expectOne(`${URL}/1`);

    expect(request.request.method).toBe('DELETE');

    request.flush(null);

    httpMock.verify();
  });

});