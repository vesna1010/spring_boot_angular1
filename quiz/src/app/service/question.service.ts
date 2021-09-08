import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuiz } from '../model/i-quiz';
import { IQuestion } from '../model/i-question';
import { IPageable } from '../model/i-pageable';
import { IPage } from '../model/i-page';

const URL = 'http://localhost:8080/quiz-service/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient
  ) { }

  findQuestionsByQuiz(quiz: IQuiz, size: number): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>((`${URL}/quiz/${quiz.id}`), { params: { size: `${size}` }, observe: 'body' });
  }

  findAllQuestions(pageable: IPageable = { page: 0, size: 10, sort: ['id'] }): Observable<IPage<IQuestion>> {
    return this.http.get<IPage<IQuestion>>(URL,
      { params: { page: `${pageable.page}`, size: `${pageable.size}`, sort: pageable.sort }, observe: 'body' });
  }

  findQuestionById(id: number): Observable<IQuestion> {
    return this.http.get<IQuestion>((`${URL}/${id}`), { observe: 'body' });
  }

  saveQuestion(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(URL, question, { observe: 'body' });
  }

  updateQuestion(question: IQuestion): Observable<IQuestion> {
    return this.http.put<IQuestion>((`${URL}/${question.id}`), question, { observe: 'body' });
  }

  deleteQuestionById(id: number): Observable<void> {
    return this.http.delete<void>((`${URL}/${id}`), { observe: 'body' });
  }

}
