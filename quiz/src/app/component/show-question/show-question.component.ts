import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/enum/answer.enum';
import { IQuestion } from 'src/app/model/i-question';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent {
  Answer = Answer;

  @Input() question: IQuestion;
  @Output() eventEmmiter: EventEmitter<number> = new EventEmitter<number>();

  answer: Answer;

  checkAnswer(userAnswer: Answer): void {
    this.answer = userAnswer;

    if (this.isCorrectAnswer()) {
      this.eventEmmiter.emit(this.question.points);
    }
  }

  private isCorrectAnswer(): boolean {
    return this.answer === this.question.correctAnswer;
  }

  ngOnChanges(): void {
    this.answer = null;
  }

}