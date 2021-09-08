import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISort } from '../model/i-sort';
import { IQuiz } from '../model/i-quiz';

const URL = 'http://localhost:8080/quiz-service/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient
  ) { }

  findAllQuizzes(sort: ISort = { sort: ['id'] }): Observable<IQuiz[]> {
    return this.http.get<IQuiz[]>(URL, { params: { ...sort }, observe: 'body' });
  }

  findQuizById(id: number): Observable<IQuiz> {
    return this.http.get<IQuiz>((`${URL}/${id}`), { observe: 'body' });
  }

  saveQuiz(quiz: IQuiz): Observable<IQuiz> {
    return this.http.post<IQuiz>(URL, quiz, { observe: 'body' });
  }

  updateQuiz(quiz: IQuiz): Observable<IQuiz> {
    return this.http.put<IQuiz>((`${URL}/${quiz.id}`), quiz, { observe: 'body' });
  }

  deleteQuizById(id: number): Observable<void> {
    return this.http.delete<void>((`${URL}/${id}`), { observe: 'body' });
  }

}
