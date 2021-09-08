import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion } from 'src/app/model/i-question';
import { IQuiz } from 'src/app/model/i-quiz';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  numberOfQuestion: number;
  score: number;
  quiz: IQuiz;
  questions: IQuestion[];

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.score = 0;
    this.numberOfQuestion = 0;
    this.quiz = JSON.parse(localStorage.getItem('quiz'));

    if (this.quiz) {
      this.findQuestionsByQuiz();
    } else {
      this.router.navigateByUrl('/');
    }
  };

  private findQuestionsByQuiz(): void {
    this.questionService.findQuestionsByQuiz(this.quiz, 3).subscribe(
      (questions) => {
        this.questions = questions;
      });
  }

  addPoints(points: number): void {
    this.score += points;
  }

  nextQuestion(): void {
    this.numberOfQuestion += 1;
  }

}
