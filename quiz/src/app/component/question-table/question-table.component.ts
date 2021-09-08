import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPage } from 'src/app/model/i-page';
import { IPageable } from 'src/app/model/i-pageable';
import { IQuestion } from 'src/app/model/i-question';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.css']
})
export class QuestionTableComponent implements OnInit {

  page: IPage<IQuestion>;
  pageable: IPageable;

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllQuestions();
  }

  deleteQuestionById(id: number): void {
    this.questionService.deleteQuestionById(id).subscribe(
      () => {
        this.findAllQuestions();
      });
  }

  private findAllQuestions(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageable = {
        page: + params['page'] || 0,
        size: + params['size'] || 10,
        sort: params['sort'] || ['id']
      };

      this.questionService.findAllQuestions(this.pageable).subscribe(
        (page) => {
          this.page = page;
        });
    });
  }

}
