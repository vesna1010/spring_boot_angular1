import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuiz } from 'src/app/model/i-quiz';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {

  quiz: IQuiz;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = + this.activatedRoute.snapshot.params.id;

    if (isNaN(id)) {
      this.resetForm();
    } else {
      this.findQuizById(id);
    }
  }

  private resetForm(): void {
    this.quiz = {
      id: null,
      name: null
    };
  }

  private findQuizById(id: number): void {
    this.quizService.findQuizById(id).subscribe(
      (quiz) => {
        this.quiz = quiz;
      },
      (e) => {
        alert(e.error.message);

        this.router.navigateByUrl('/quizzes/form');
      });
  }

  saveQuiz(): void {
    this.quizService.saveQuiz(this.quiz).subscribe(
      (quiz) => {
        alert('Your Data Has Been Successfully Saved.');

        this.router.navigateByUrl('/quizzes/form/' + quiz.id);
      });
  }

  updateQuiz(): void {
    this.quizService.updateQuiz(this.quiz).subscribe(
      (quiz) => {
        alert('Your Data Has Been Successfully Updated.');

        this.quiz = quiz;
      });
  }

}
