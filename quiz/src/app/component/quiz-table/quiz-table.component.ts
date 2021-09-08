import { Component, OnInit } from '@angular/core';
import { IQuiz } from 'src/app/model/i-quiz';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-table',
  templateUrl: './quiz-table.component.html',
  styleUrls: ['./quiz-table.component.css']
})
export class QuizTableComponent implements OnInit {

  quizzes: IQuiz[];

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.findAllQuizzes();
  }

  deleteQuizById(id: number): void {
    this.quizService.deleteQuizById(id).subscribe(
      () => {
        this.findAllQuizzes();
      });
  }

  private findAllQuizzes(): void {
    this.quizService.findAllQuizzes().subscribe(
      (quizzes) => {
        this.quizzes = quizzes;
      });
  }
}
