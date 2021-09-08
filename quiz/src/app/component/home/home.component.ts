import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuiz } from 'src/app/model/i-quiz';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quizzes: IQuiz[];
  quiz: IQuiz;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quizService.findAllQuizzes().subscribe(
      (quizzes) => {
        this.quizzes = quizzes;

        localStorage.removeItem('quiz');
      });
  }

  setQuiz(): void {
    localStorage.setItem('quiz', JSON.stringify(this.quiz));

    this.router.navigateByUrl('/play');
  }

}
