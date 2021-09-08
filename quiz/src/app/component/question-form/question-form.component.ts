import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'src/app/enum/answer.enum';
import { Points } from 'src/app/enum/points.enum';
import { IQuestion } from 'src/app/model/i-question';
import { IQuiz } from 'src/app/model/i-quiz';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  Points = Points;
  Answer = Answer;

  question: IQuestion;
  quizzes: IQuiz[];

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = + this.activatedRoute.snapshot.params.id;

    if (isNaN(id)) {
      this.resetForm();
    } else {
      this.findQuestionById(id);
    }

    this.findAllQuizzes();
  }

  private resetForm(): void {
    this.question = {
      id: null,
      text: null,
      answerA: null,
      answerB: null,
      answerC: null,
      answerD: null,
      correctAnswer: null,
      quiz: { id: null, name: null },
      points: null
    };
  }

  private findQuestionById(id: number): void {
    this.questionService.findQuestionById(id).subscribe(
      (question) => {
        this.question = question;
      },
      (e) => {
        alert(e.error.message);

        this.router.navigateByUrl('/questions/form');
      });
  }

  private findAllQuizzes(): void {
    this.quizService.findAllQuizzes().subscribe(
      (quizzes) => {
        this.quizzes = quizzes;
      });
  }

  saveQuestion(): void {
    this.questionService.saveQuestion(this.question).subscribe(
      (question) => {
        alert('Your Data Has Been Successfully Saved.');

        this.router.navigateByUrl('/questions/form/' + question.id);
      });
  }

  updateQuestion(): void {
    this.questionService.updateQuestion(this.question).subscribe(
      (question) => {
        alert('Your Data Has Been Successfully Updated.');

        this.question = question;
      });
  }

  isEqualQuizzes(quiz1: IQuiz, quiz2: IQuiz): boolean {
    return (quiz1 && quiz2 && quiz1.id === quiz2.id);
  }

}
